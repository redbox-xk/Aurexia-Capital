"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Wallet } from "@/lib/types"
import { formatCurrency, truncateAddress, isValidAddress } from "@/lib/wallet-utils"
import { createTransaction } from "@/app/dashboard/actions"
import { 
  ArrowUpRight, 
  Wallet as WalletIcon,
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-react"

interface SendFormProps {
  wallets: Wallet[]
}

export function SendForm({ wallets }: SendFormProps) {
  const [selectedWallet, setSelectedWallet] = useState<string>(wallets.find(w => w.is_primary)?.id || wallets[0]?.id || "")
  const [toAddress, setToAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const selectedWalletData = wallets.find(w => w.id === selectedWallet)
  const parsedAmount = parseFloat(amount) || 0
  const isValidAmount = parsedAmount > 0 && parsedAmount <= (selectedWalletData?.balance || 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (!isValidAddress(toAddress)) {
      setError("Please enter a valid wallet address")
      setLoading(false)
      return
    }

    if (!isValidAmount) {
      setError("Please enter a valid amount within your balance")
      setLoading(false)
      return
    }

    const result = await createTransaction({
      wallet_id: selectedWallet,
      type: "send",
      amount: parsedAmount,
      to_address: toAddress,
      description: description || undefined,
    })

    if (result.error) {
      setError(result.error)
      setLoading(false)
      return
    }

    setSuccess(true)
    setTimeout(() => {
      router.push("/dashboard/history")
      router.refresh()
    }, 2000)
  }

  if (success) {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-card border-border">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Transaction Sent!</h3>
            <p className="text-muted-foreground text-center max-w-sm mb-2">
              {formatCurrency(parsedAmount)} has been sent successfully
            </p>
            <p className="text-sm text-muted-foreground">
              To: {truncateAddress(toAddress)}
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Logo size="sm" showText={false} />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Send Funds</h1>
          <p className="text-muted-foreground">Transfer from your Flash Wallet</p>
        </div>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle>Send Transaction</CardTitle>
              <CardDescription>Enter the details below to send funds</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* From Wallet */}
            <div className="space-y-2">
              <Label>From Wallet</Label>
              <Select value={selectedWallet} onValueChange={setSelectedWallet}>
                <SelectTrigger>
                  <SelectValue placeholder="Select wallet" />
                </SelectTrigger>
                <SelectContent>
                  {wallets.map((wallet) => (
                    <SelectItem key={wallet.id} value={wallet.id}>
                      <div className="flex items-center gap-2">
                        <WalletIcon className="w-4 h-4" />
                        <span>{wallet.name}</span>
                        <span className="text-muted-foreground">
                          ({formatCurrency(wallet.balance, wallet.currency)})
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedWalletData && (
                <p className="text-sm text-muted-foreground">
                  Available balance: {formatCurrency(selectedWalletData.balance, selectedWalletData.currency)}
                </p>
              )}
            </div>

            {/* To Address */}
            <div className="space-y-2">
              <Label htmlFor="toAddress">Recipient Address</Label>
              <Input
                id="toAddress"
                placeholder="0x..."
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
                className="font-mono"
              />
              {toAddress && !isValidAddress(toAddress) && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Invalid wallet address format
                </p>
              )}
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ({selectedWalletData?.currency || "USD"})</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-7"
                />
              </div>
              {parsedAmount > (selectedWalletData?.balance || 0) && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Insufficient balance
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="What's this payment for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            {/* Submit */}
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading || !isValidAddress(toAddress) || !isValidAmount}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                  Send {parsedAmount > 0 ? formatCurrency(parsedAmount) : "Funds"}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
