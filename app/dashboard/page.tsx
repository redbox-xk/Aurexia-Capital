import { createClient } from "@/lib/supabase/server"
import { DashboardOverview } from "@/components/dashboard/overview"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: wallets } = await supabase
    .from("wallets")
    .select("*")
    .eq("user_id", user?.id)
    .order("is_primary", { ascending: false })

  const { data: transactions } = await supabase
    .from("transactions")
    .select(`
      *,
      wallet:wallets!inner(user_id, name)
    `)
    .eq("wallet.user_id", user?.id)
    .order("created_at", { ascending: false })
    .limit(5)

  const totalBalance = wallets?.reduce((sum, w) => sum + (w.balance || 0), 0) || 0

  return (
    <DashboardOverview 
      wallets={wallets || []} 
      transactions={transactions || []}
      totalBalance={totalBalance}
      userName={user?.user_metadata?.full_name || "User"}
    />
  )
}
