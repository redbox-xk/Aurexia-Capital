'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'

interface TransactionHistoryProps {
  transactions: any[]
  wallets: any[]
}

export function TransactionHistory({ transactions, wallets }: TransactionHistoryProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Transaction History</h1>
        <p className="text-muted-foreground mt-2">View all your past transactions</p>
      </div>

      {transactions && transactions.length > 0 ? (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>{transactions.length} total transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((tx: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:bg-muted/50 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-muted rounded-full">
                      {tx.type === 'send' ? (
                        <ArrowUpRight className="w-4 h-4 text-red-500" />
                      ) : (
                        <ArrowDownLeft className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium capitalize">{tx.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(tx.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{tx.amount} {tx.asset}</p>
                    <Badge 
                      variant={tx.status === 'completed' ? 'default' : 'outline'}
                      className="mt-1"
                    >
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">No transactions yet</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
