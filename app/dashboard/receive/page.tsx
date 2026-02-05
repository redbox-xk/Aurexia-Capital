'use client';

import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { redirect } from "next/navigation"

export default async function ReceivePage() {
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
          <h1 className="text-3xl font-bold text-foreground">Receive</h1>
          <p className="text-muted-foreground mt-2">Create a wallet first to receive funds</p>
        </div>
      </div>
    )
  }

  const primaryWallet = wallets[0]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Receive Funds</h1>
        <p className="text-muted-foreground mt-2">Share your wallet address to receive payments</p>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Your Wallet Address</CardTitle>
          <CardDescription>{primaryWallet.name} on {primaryWallet.network}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-muted/50 rounded-lg border border-border/50">
            <p className="text-sm text-muted-foreground mb-2">Address</p>
            <p className="font-mono text-sm break-all">{primaryWallet.address}</p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => navigator.clipboard.writeText(primaryWallet.address)}
              variant="outline"
              className="flex-1"
            >
              Copy Address
            </Button>
            <Badge variant="outline" className="h-11 px-4">
              {primaryWallet.network}
            </Badge>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-900 dark:text-blue-200">
              Only send {primaryWallet.network} to this address. Sending other assets will result in permanent loss.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
