"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { createNewWallet } from "@/lib/web3/wallet"
import { getBalance } from "@/lib/web3/blockchain"

export async function getWallets() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: "Not authenticated", wallets: [] }
  }

  const { data: wallets, error } = await supabase
    .from("wallets")
    .select("*")
    .eq("user_id", user.id)
    .order("is_primary", { ascending: false })
    .order("created_at", { ascending: false })

  if (error) {
    return { error: error.message, wallets: [] }
  }

  // Fetch real balances from blockchain for each wallet
  const walletsWithBalances = await Promise.all(
    (wallets || []).map(async (wallet) => {
      try {
        const balanceData = await getBalance(wallet.address, wallet.network || 'ethereum')
        return { ...wallet, balance: balanceData.formatted }
      } catch {
        return wallet
      }
    })
  )

  return { wallets: walletsWithBalances, error: null }
}

export async function createWallet(name: string, network: string = 'ethereum') {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: "Not authenticated" }
  }

  try {
    // Generate real Ethereum wallet
    const newWallet = await createNewWallet()

    // Check if this is the first wallet (make it primary)
    const { data: existingWallets } = await supabase
      .from("wallets")
      .select("id")
      .eq("user_id", user.id)

    const isPrimary = !existingWallets || existingWallets.length === 0

    // Fetch initial balance from blockchain
    let initialBalance = "0"
    try {
      const balanceData = await getBalance(newWallet.address, network as any)
      initialBalance = balanceData.formatted
    } catch (err) {
      console.error("Failed to fetch balance:", err)
    }

    const { data: wallet, error } = await supabase
      .from("wallets")
      .insert({
        user_id: user.id,
        name,
        address: newWallet.address,
        public_key: newWallet.publicKey,
        balance: initialBalance,
        network,
        is_primary: isPrimary,
      })
      .select()
      .single()

    if (error) {
      return { error: error.message }
    }

    revalidatePath("/dashboard")
    revalidatePath("/dashboard/wallets")
    return { wallet, error: null }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create wallet"
    return { error: message }
  }
}

export async function updateWallet(walletId: string, updates: { name?: string; is_primary?: boolean }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: "Not authenticated" }
  }

  // If setting as primary, unset other wallets first
  if (updates.is_primary) {
    await supabase
      .from("wallets")
      .update({ is_primary: false })
      .eq("user_id", user.id)
  }

  const { error } = await supabase
    .from("wallets")
    .update(updates)
    .eq("id", walletId)
    .eq("user_id", user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard")
  revalidatePath("/dashboard/wallets")
  return { error: null }
}

export async function deleteWallet(walletId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: "Not authenticated" }
  }

  const { error } = await supabase
    .from("wallets")
    .delete()
    .eq("id", walletId)
    .eq("user_id", user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard")
  revalidatePath("/dashboard/wallets")
  return { error: null }
}

export async function getTransactions(walletId?: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: "Not authenticated", transactions: [] }
  }

  let query = supabase
    .from("transactions")
    .select(`
      *,
      wallet:wallets!inner(user_id, name)
    `)
    .eq("wallet.user_id", user.id)
    .order("created_at", { ascending: false })

  if (walletId) {
    query = query.eq("wallet_id", walletId)
  }

  const { data: transactions, error } = await query

  if (error) {
    return { error: error.message, transactions: [] }
  }

  return { transactions: transactions || [], error: null }
}

export async function createTransaction(data: {
  wallet_id: string
  type: "send" | "receive"
  amount: number
  from_address?: string
  to_address?: string
  description?: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: "Not authenticated" }
  }

  // Verify wallet belongs to user
  const { data: wallet } = await supabase
    .from("wallets")
    .select("*")
    .eq("id", data.wallet_id)
    .eq("user_id", user.id)
    .single()

  if (!wallet) {
    return { error: "Wallet not found" }
  }

  // Calculate new balance
  const newBalance = data.type === "receive" 
    ? wallet.balance + data.amount 
    : wallet.balance - data.amount

  if (data.type === "send" && newBalance < 0) {
    return { error: "Insufficient balance" }
  }

  // Create transaction
  const { data: transaction, error: txError } = await supabase
    .from("transactions")
    .insert({
      wallet_id: data.wallet_id,
      type: data.type,
      amount: data.amount,
      currency: wallet.currency,
      from_address: data.from_address,
      to_address: data.to_address,
      description: data.description,
      status: "completed",
    })
    .select()
    .single()

  if (txError) {
    return { error: txError.message }
  }

  // Update wallet balance
  await supabase
    .from("wallets")
    .update({ balance: newBalance })
    .eq("id", data.wallet_id)

  revalidatePath("/dashboard")
  revalidatePath("/dashboard/wallets")
  revalidatePath("/dashboard/history")
  return { transaction, error: null }
}

export async function getTotalBalance() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { total: 0, error: "Not authenticated" }
  }

  const { data: wallets, error } = await supabase
    .from("wallets")
    .select("balance")
    .eq("user_id", user.id)

  if (error) {
    return { total: 0, error: error.message }
  }

  const total = wallets?.reduce((sum, w) => sum + (w.balance || 0), 0) || 0
  return { total, error: null }
}
