import { createClient } from "@/lib/supabase/server"
import { SendWeb3 } from "@/components/dashboard/send-web3"
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

  const primaryWallet = wallets[0]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Send Transaction</h1>
        <p className="text-muted-foreground mt-2">
          Send {primaryWallet.network} from your wallet to any address
        </p>
      </div>
      <SendWeb3
        fromAddress={primaryWallet.address}
        balance={primaryWallet.balance}
        network={primaryWallet.network}
      />
    </div>
  )
}
