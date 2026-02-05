"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// Generate random Ethereum address format
function generateWalletAddress(): string {
  return '0x' + Array.from({ length: 40 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('')
}

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

  if (error) {
    return { error: error.message, wallets: [] }
  }

  return { wallets: wallets || [], error: null }
}

export async function createWallet(name: string, network: string = 'ethereum') {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  try {
    const { data: existingWallets } = await supabase
      .from("wallets")
      .select("id")
      .eq("user_id", user.id)

    const isPrimary = !existingWallets || existingWallets.length === 0
    const address = generateWalletAddress()

    const { data: wallet, error } = await supabase
      .from("wallets")
      .insert({
        user_id: user.id,
        name,
        address,
        balance: "0",
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
