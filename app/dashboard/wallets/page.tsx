import { createClient } from "@/lib/supabase/server"
import { WalletsManager } from "@/components/dashboard/wallets-manager"

export default async function WalletsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: wallets } = await supabase
    .from("wallets")
    .select("*")
    .eq("user_id", user?.id)
    .order("is_primary", { ascending: false })
    .order("created_at", { ascending: false })

  return <WalletsManager wallets={wallets || []} />
}
