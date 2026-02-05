import { createClient } from "@/lib/supabase/server"
import { ReceiveWeb3 } from "@/components/dashboard/receive-web3"
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

  const primaryWallet = wallets[0]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Receive Crypto</h1>
        <p className="text-muted-foreground mt-2">
          Share your wallet address to receive {primaryWallet.network}
        </p>
      </div>
      <ReceiveWeb3
        address={primaryWallet.address}
        network={primaryWallet.network}
        walletName={primaryWallet.name}
      />
    </div>
  )
}
