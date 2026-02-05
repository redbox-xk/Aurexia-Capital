import { createClient } from "@/lib/supabase/server"
import { WalletsManagerWeb3 } from "@/components/dashboard/wallets-manager-web3"

export default async function WalletsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return <div>Not authenticated</div>
  }

  const { data: wallets } = await supabase
    .from("wallets")
    .select("*")
    .eq("user_id", user.id)
    .order("is_primary", { ascending: false })
    .order("created_at", { ascending: false })

  return <WalletsManagerWeb3 wallets={wallets || []} userId={user.id} />
}
