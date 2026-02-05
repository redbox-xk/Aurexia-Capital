import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { redirect } from "next/navigation"

export default async function SendPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: wallets } = await supabase
    .from("wallets")
    .select("*")
    .eq("user_id", user.id)
    .order("is_primary", { ascending: false })

  if (!wallets || wallets.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Send</h1>
          <p className="text-muted-foreground mt-2">Create a wallet first to send transactions</p>
        </div>
      </div>
    )
  }

  const primaryWallet = wallets[0]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Send Funds</h1>
        <p className="text-muted-foreground mt-2">Transfer funds securely from {primaryWallet.name}</p>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Send Transaction</CardTitle>
          <CardDescription>
            From: {primaryWallet.address.slice(0, 6)}...{primaryWallet.address.slice(-4)} | Balance: {primaryWallet.balance || "0"} {primaryWallet.network}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Address</Label>
            <Input
              id="recipient"
              placeholder="0x..."
              className="font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              step="0.0001"
            />
          </div>

          <Button className="w-full h-11">
            Preview & Send
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
