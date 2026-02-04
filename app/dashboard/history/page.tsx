import { createClient } from "@/lib/supabase/server"
import { TransactionHistory } from "@/components/dashboard/transaction-history"

export default async function HistoryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: wallets } = await supabase
    .from("wallets")
    .select("id, name")
    .eq("user_id", user?.id)

  const { data: transactions } = await supabase
    .from("transactions")
    .select(`
      *,
      wallet:wallets!inner(user_id, name)
    `)
    .eq("wallet.user_id", user?.id)
    .order("created_at", { ascending: false })

  return (
    <TransactionHistory 
      transactions={transactions || []} 
      wallets={wallets || []}
    />
  )
}
