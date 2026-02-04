import { createClient } from "@/lib/supabase/server"
import { SendForm } from "@/components/dashboard/send-form"
import { redirect } from "next/navigation"

export default async function SendPage() {
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

  return <SendForm wallets={wallets} />
}
