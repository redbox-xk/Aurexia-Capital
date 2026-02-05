import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"

export default async function WalletsPage() {
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
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Wallets</h1>
          <p className="text-muted-foreground mt-2">Manage your cryptocurrency wallets</p>
        </div>
        <Button>Create Wallet</Button>
      </div>

      {!wallets || wallets.length === 0 ? (
        <Card className="border-border/50 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <p className="text-muted-foreground mb-4">No wallets yet</p>
            <Button>Create Your First Wallet</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {wallets.map((wallet) => (
            <Card key={wallet.id} className="border-border/50 hover:border-primary/30 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{wallet.name}</CardTitle>
                    <CardDescription className="font-mono text-xs mt-1">
                      {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                    </CardDescription>
                  </div>
                  {wallet.is_primary && (
                    <Badge className="bg-primary/10 text-primary border-primary/20">Primary</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Balance</p>
                    <p className="text-lg font-semibold">{wallet.balance || "0"} {wallet.network}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Network</p>
                    <Badge variant="outline">{wallet.network}</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">View</Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">Edit</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
