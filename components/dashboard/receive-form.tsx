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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import type { Wallet } from "@/lib/types"
import { formatCurrency, truncateAddress, generateWalletAddress, isValidAddress } from "@/lib/wallet-utils"
import { createTransaction } from "@/app/dashboard/actions"
import { 
  ArrowDownLeft, 
  Wallet as WalletIcon,
  Copy,
  Check,
  Loader2,
  CheckCircle,
  AlertCircle,
  QrCode
} from "lucide-react"

interface ReceiveFormProps {
  wallets: Wallet[]
}

export function ReceiveForm({ wallets }: ReceiveFormProps) {
  const [selectedWallet, setSelectedWallet] = useState<string>(wallets.find(w => w.is_primary)?.id || wallets[0]?.id || "")
  const [fromAddress, setFromAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  const selectedWalletData = wallets.find(w => w.id === selectedWallet)
  const parsedAmount = parseFloat(amount) || 0

  const copyAddress = () => {
    if (selectedWalletData) {
      navigator.clipboard.writeText(selectedWalletData.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSimulateReceive = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (parsedAmount <= 0) {
      setError("Please enter a valid amount")
      setLoading(false)
      return
    }

    const result = await createTransaction({
      wallet_id: selectedWallet,
      type: "receive",
      amount: parsedAmount,
      from_address: fromAddress || generateWalletAddress(),
      description: description || "Received funds",
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
            <h3 className="text-xl font-semibold text-foreground mb-2">Funds Received!</h3>
            <p className="text-muted-foreground text-center max-w-sm mb-2">
              {formatCurrency(parsedAmount)} has been added to your wallet
            </p>
            <p className="text-sm text-muted-foreground">
              Wallet: {selectedWalletData?.name}
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
          <h1 className="text-2xl font-bold text-foreground">Receive Funds</h1>
          <p className="text-muted-foreground">Accept payments to your Flash Wallet</p>
        </div>
      </div>

      <Tabs defaultValue="address" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="address">Share Address</TabsTrigger>
          <TabsTrigger value="simulate">Add Funds</TabsTrigger>
        </TabsList>

        {/* Share Address Tab */}
        <TabsContent value="address">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Your Wallet Address</CardTitle>
                  <CardDescription>Share this address to receive funds</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Wallet Selector */}
              <div className="space-y-2">
                <Label>Select Wallet</Label>
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
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* QR Code Placeholder */}
              <div className="flex flex-col items-center py-6">
                <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center mb-4 border-2 border-dashed border-border">
                  <div className="text-center">
                    <QrCode className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">QR Code</p>
                  </div>
                </div>
                
                {selectedWalletData && (
                  <div className="w-full space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <code className="flex-1 text-sm font-mono break-all text-foreground">
                        {selectedWalletData.address}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={copyAddress}
                        className="flex-shrink-0"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <Button onClick={copyAddress} className="w-full">
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Address
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Simulate Receive Tab */}
        <TabsContent value="simulate">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <ArrowDownLeft className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Add Funds</CardTitle>
                  <CardDescription>Manually add funds to your wallet</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSimulateReceive} className="space-y-6">
                {/* To Wallet */}
                <div className="space-y-2">
                  <Label>Receive To</Label>
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
                </div>

                {/* From Address (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="fromAddress">From Address (Optional)</Label>
                  <Input
                    id="fromAddress"
                    placeholder="0x... (leave empty for random)"
                    value={fromAddress}
                    onChange={(e) => setFromAddress(e.target.value)}
                    className="font-mono"
                  />
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
                  disabled={loading || parsedAmount <= 0}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ArrowDownLeft className="w-4 h-4 mr-2" />
                      Add {parsedAmount > 0 ? formatCurrency(parsedAmount) : "Funds"}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
