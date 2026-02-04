import { createClient } from "@/lib/supabase/server"
import { ReceiveForm } from "@/components/dashboard/receive-form"
import { redirect } from "next/navigation"

export default async function ReceivePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: wallets } = await supabase
    .from("wallets")
    .select("*")
    .eq("user_id", user?.id)
    .order("is_primary", { ascending: false })

  if (!wallets || wallets.length === 0) {
    redirect("/dashboard/wallets")
  }

  return <ReceiveForm wallets={wallets} />
}
