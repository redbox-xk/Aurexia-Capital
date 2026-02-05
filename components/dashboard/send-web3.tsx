'use client'

import React from "react"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AlertCircle, Loader2, Copy } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { validateAddress, estimateGasTransfer, formatAddress } from '@/lib/web3/wallet'
import { getBalance } from '@/lib/web3/blockchain'
import { NETWORKS } from '@/lib/web3/config'

interface SendWeb3Props {
  fromAddress: string
  balance: string
  network: string
}

export function SendWeb3({ fromAddress, balance, network }: SendWeb3Props) {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [gasEstimate, setGasEstimate] = useState<string | null>(null)
  const [recipientValid, setRecipientValid] = useState<boolean | null>(null)
  const [step, setStep] = useState<'form' | 'review'>('form')
  const [txHash, setTxHash] = useState<string | null>(null)

  const validateRecipient = async (address: string) => {
    const isValid = await validateAddress(address)
    setRecipientValid(isValid)
    return isValid
  }

  const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setRecipient(value)
    if (value) {
      validateRecipient(value)
    } else {
      setRecipientValid(null)
    }
  }

  const estimateGas = async () => {
    if (!recipientValid || !amount) return
    
    setLoading(true)
    setError(null)
    try {
      const estimate = await estimateGasTransfer(
        fromAddress,
        recipient,
        amount,
        network as any
      )
      setGasEstimate(estimate)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to estimate gas')
    } finally {
      setLoading(false)
    }
  }

  const handleReview = async () => {
    if (!recipientValid) {
      setError('Invalid recipient address')
      return
    }

    const balanceNum = parseFloat(balance)
    const amountNum = parseFloat(amount)
    const gasNum = parseFloat(gasEstimate || '0')

    if (amountNum + gasNum > balanceNum) {
      setError('Insufficient balance for transaction + gas')
      return
    }

    setStep('review')
  }

  const handleSend = async () => {
    setLoading(true)
    setError(null)
    try {
      // This would require signing the transaction
      // In a real app, use Web3Auth or ethers.js Signer
      throw new Error('Transaction signing requires Web3Auth provider')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send transaction')
    } finally {
      setLoading(false)
    }
  }

  const net = NETWORKS[network as keyof typeof NETWORKS]

  if (step === 'review') {
    return (
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Review Transaction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="border-primary/30 bg-primary/5">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please review all details before confirming this transaction.
            </AlertDescription>
          </Alert>

          <div className="space-y-4 bg-muted/50 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-muted-foreground mb-1">From</p>
                <p className="font-mono text-sm">{formatAddress(fromAddress)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground mb-1">Current Balance</p>
                <p className="text-lg font-semibold">{balance} {net?.nativeCurrency}</p>
              </div>
            </div>

            <div className="border-t border-border my-4" />

            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-muted-foreground mb-1">To</p>
                <p className="font-mono text-sm">{formatAddress(recipient)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground mb-1">Amount</p>
                <p className="text-lg font-semibold">{amount} {net?.nativeCurrency}</p>
              </div>
            </div>

            <div className="border-t border-border my-4" />

            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Network</p>
                <p className="text-sm font-medium">{net?.name}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground mb-1">Estimated Gas</p>
                <p className="text-sm font-medium">{gasEstimate} {net?.nativeCurrency}</p>
              </div>
            </div>

            <div className="border-t border-border my-4" />

            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Cost</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary">
                  {(parseFloat(amount) + parseFloat(gasEstimate || '0')).toFixed(6)} {net?.nativeCurrency}
                </p>
              </div>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2">
            <Button
              onClick={() => setStep('form')}
              variant="outline"
              className="flex-1"
              disabled={loading}
            >
              Back
            </Button>
            <Button onClick={handleSend} className="flex-1" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                'Confirm Send'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Send Transaction</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Enter the recipient address and amount to send {net?.nativeCurrency} on {net?.name}
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <label className="text-sm font-medium">From</label>
          <div className="flex items-center gap-2 bg-muted/50 p-3 rounded-lg">
            <code className="font-mono text-sm flex-1">{formatAddress(fromAddress)}</code>
            <button
              onClick={() => navigator.clipboard.writeText(fromAddress)}
              className="p-2 hover:bg-background rounded"
            >
              <Copy size={16} />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Balance</label>
          <p className="text-2xl font-bold">{balance} {net?.nativeCurrency}</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Recipient Address
            {recipientValid === true && <span className="text-success ml-2">✓ Valid</span>}
            {recipientValid === false && <span className="text-destructive ml-2">✗ Invalid</span>}
          </label>
          <Input
            placeholder="0x..."
            value={recipient}
            onChange={handleRecipientChange}
            className={
              recipientValid === false
                ? 'border-destructive focus:border-destructive'
                : recipientValid === true
                  ? 'border-success focus:border-success'
                  : ''
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Amount to Send</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.0001"
              min="0"
            />
            <Button
              variant="outline"
              onClick={() => setAmount(balance)}
              className="whitespace-nowrap"
            >
              Max
            </Button>
          </div>
        </div>

        {gasEstimate && (
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-xs text-muted-foreground mb-2">Estimated Gas Fee</p>
            <p className="text-lg font-semibold">
              {gasEstimate} {net?.nativeCurrency}
            </p>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2">
          {!gasEstimate ? (
            <Button
              onClick={estimateGas}
              className="flex-1"
              disabled={loading || !recipientValid || !amount}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Calculating...
                </>
              ) : (
                'Estimate Gas'
              )}
            </Button>
          ) : (
            <Button
              onClick={handleReview}
              className="flex-1"
              disabled={loading || !recipientValid || !amount}
            >
              Review & Send
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
