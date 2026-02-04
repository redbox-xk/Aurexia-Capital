"use client"

import Link from "next/link"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Wallet, Transaction } from "@/lib/types"
import { formatCurrency, truncateAddress, formatRelativeTime } from "@/lib/wallet-utils"
import { 
  Wallet as WalletIcon, 
  ArrowUpRight, 
  ArrowDownLeft,
  Plus,
  ChevronRight,
  TrendingUp
} from "lucide-react"

interface DashboardOverviewProps {
  wallets: Wallet[]
  transactions: (Transaction & { wallet: { name: string } })[]
  totalBalance: number
  userName: string
}

export function DashboardOverview({ wallets, transactions, totalBalance, userName }: DashboardOverviewProps) {
  const primaryWallet = wallets.find(w => w.is_primary)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <Logo size="sm" showText={false} />
          <h1 className="text-3xl font-bold text-foreground">
            Welcome, {userName.split(" ")[0]}
          </h1>
        </div>
        <p className="text-lg text-muted-foreground font-light">
          Your financial home is safe and secure. Here's your complete picture.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-primary/5 to-transparent border-border/50 hover:border-primary/30 transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2 font-medium">Your Wealth</p>
                <p className="text-4xl font-bold text-foreground">
                  {formatCurrency(totalBalance)}
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Wallets</p>
                <p className="text-3xl font-bold text-foreground">{wallets.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <WalletIcon className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Transactions</p>
                <p className="text-3xl font-bold text-foreground">{transactions.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <ArrowUpRight className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-transparent">
          <Link href="/dashboard/send">
            <ArrowUpRight className="w-5 h-5 text-primary" />
            <span>Send</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-transparent">
          <Link href="/dashboard/receive">
            <ArrowDownLeft className="w-5 h-5 text-primary" />
            <span>Receive</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-transparent">
          <Link href="/dashboard/wallets">
            <WalletIcon className="w-5 h-5 text-primary" />
            <span>Wallets</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-transparent">
          <Link href="/dashboard/history">
            <ChevronRight className="w-5 h-5 text-primary" />
            <span>History</span>
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Wallets Section */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Your Wallets</CardTitle>
              <CardDescription>Manage your digital wallets</CardDescription>
            </div>
            <Button asChild size="sm">
              <Link href="/dashboard/wallets">
                <Plus className="w-4 h-4 mr-1" />
                New
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {wallets.length === 0 ? (
              <div className="text-center py-8">
                <WalletIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No wallets yet</p>
                <Button asChild>
                  <Link href="/dashboard/wallets">Create your first wallet</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {wallets.slice(0, 3).map((wallet) => (
                  <div
                    key={wallet.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <WalletIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">{wallet.name}</p>
                          {wallet.is_primary && (
                            <Badge variant="secondary" className="text-xs">Primary</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {truncateAddress(wallet.address)}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-foreground">
                      {formatCurrency(wallet.balance, wallet.currency)}
                    </p>
                  </div>
                ))}
                {wallets.length > 3 && (
                  <Button asChild variant="ghost" className="w-full">
                    <Link href="/dashboard/wallets">
                      View all {wallets.length} wallets
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <CardDescription>Your latest transactions</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard/history">
                View all
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <div className="text-center py-8">
                <ArrowUpRight className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No transactions yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.type === "receive" ? "bg-green-500/10" : "bg-red-500/10"
                      }`}>
                        {tx.type === "receive" ? (
                          <ArrowDownLeft className="w-5 h-5 text-green-500" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground capitalize">{tx.type}</p>
                        <p className="text-sm text-muted-foreground">
                          {tx.wallet.name} · {formatRelativeTime(tx.created_at)}
                        </p>
                      </div>
                    </div>
                    <p className={`font-semibold ${
                      tx.type === "receive" ? "text-green-500" : "text-red-500"
                    }`}>
                      {tx.type === "receive" ? "+" : "-"}{formatCurrency(tx.amount, tx.currency)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
