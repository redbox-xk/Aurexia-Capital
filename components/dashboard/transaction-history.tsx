"use client"

import { useState } from "react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Transaction, Wallet } from "@/lib/types"
import { formatCurrency, truncateAddress, formatDate, formatTime } from "@/lib/wallet-utils"
import { 
  ArrowUpRight, 
  ArrowDownLeft,
  Filter,
  Calendar
} from "lucide-react"

interface TransactionHistoryProps {
  transactions: (Transaction & { wallet: { name: string } })[]
  wallets: Pick<Wallet, "id" | "name">[]
}

export function TransactionHistory({ transactions, wallets }: TransactionHistoryProps) {
  const [filterType, setFilterType] = useState<string>("all")
  const [filterWallet, setFilterWallet] = useState<string>("all")

  const filteredTransactions = transactions.filter((tx) => {
    if (filterType !== "all" && tx.type !== filterType) return false
    if (filterWallet !== "all" && tx.wallet_id !== filterWallet) return false
    return true
  })

  // Group transactions by date
  const groupedTransactions = filteredTransactions.reduce((groups, tx) => {
    const date = formatDate(tx.created_at)
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(tx)
    return groups
  }, {} as Record<string, typeof filteredTransactions>)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Logo size="sm" showText={false} />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Transaction History</h1>
            <p className="text-muted-foreground">View all your Flash Wallet transactions</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-32">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="send">Sent</SelectItem>
              <SelectItem value="receive">Received</SelectItem>
            </SelectContent>
          </Select>
          
          {wallets.length > 0 && (
            <Select value={filterWallet} onValueChange={setFilterWallet}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Wallet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Wallets</SelectItem>
                {wallets.map((wallet) => (
                  <SelectItem key={wallet.id} value={wallet.id}>
                    {wallet.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {/* Transactions */}
      {filteredTransactions.length === 0 ? (
        <Card className="bg-card border-border">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No transactions yet</h3>
            <p className="text-muted-foreground text-center max-w-sm">
              {filterType !== "all" || filterWallet !== "all"
                ? "No transactions match your filters"
                : "Your transaction history will appear here once you send or receive funds"
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedTransactions).map(([date, txs]) => (
            <div key={date}>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-sm font-medium text-muted-foreground">{date}</h3>
              </div>
              
              <Card className="bg-card border-border">
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {txs.map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            tx.type === "receive" ? "bg-green-500/10" : "bg-red-500/10"
                          }`}>
                            {tx.type === "receive" ? (
                              <ArrowDownLeft className="w-6 h-6 text-green-500" />
                            ) : (
                              <ArrowUpRight className="w-6 h-6 text-red-500" />
                            )}
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-foreground capitalize">{tx.type}</p>
                              <Badge variant={tx.status === "completed" ? "secondary" : "outline"} className="text-xs">
                                {tx.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {tx.wallet.name}
                              {tx.type === "send" && tx.to_address && (
                                <> · To: {truncateAddress(tx.to_address)}</>
                              )}
                              {tx.type === "receive" && tx.from_address && (
                                <> · From: {truncateAddress(tx.from_address)}</>
                              )}
                            </p>
                            {tx.description && (
                              <p className="text-sm text-muted-foreground mt-1">{tx.description}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className={`font-semibold ${
                            tx.type === "receive" ? "text-green-500" : "text-red-500"
                          }`}>
                            {tx.type === "receive" ? "+" : "-"}{formatCurrency(tx.amount, tx.currency)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatTime(tx.created_at)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
