'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { OPM_TOKEN_ADDRESS } from '@/constants'
import { toast } from 'react-hot-toast'

export function PaymentForm() {
  const { address, isConnected } = useAccount()
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [qrCode, setQrCode] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isConnected) {
      toast.error('Please connect your wallet first')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId: address,
          amount: parseFloat(amount),
          tokenAddress: OPM_TOKEN_ADDRESS,
          description,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setQrCode(data.qrCode)
        toast.success('Payment QR code generated')
      } else {
        toast.error('Failed to create payment')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Create Payment</CardTitle>
        <CardDescription>Generate a QR code for customers to pay with OPM</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium">
              Amount (OPM)
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-md border bg-background px-3 py-2"
              placeholder="100"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description (Optional)
            </label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-md border bg-background px-3 py-2"
              placeholder="Payment for services"
            />
          </div>
          {qrCode && (
            <div className="space-y-2 text-center">
              <p className="text-sm font-medium">Scan to Pay</p>
              <img src={qrCode} alt="Payment QR Code" className="mx-auto h-48 w-48" />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" variant="gold" className="w-full" disabled={loading}>
            {loading ? 'Generating...' : 'Generate QR Code'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
