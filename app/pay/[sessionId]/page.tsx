'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { OPM_TOKEN_ADDRESS } from '@/constants'

export default function PaymentPage() {
  const params = useParams()
  const sessionId = params.sessionId as string
  const { isConnected } = useAccount()
  const [payment, setPayment] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const { sendTransaction, data: txHash } = useSendTransaction()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  })

  useEffect(() => {
    fetchPayment()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId])

  const fetchPayment = async () => {
    try {
      const response = await fetch(`/api/payments/${sessionId}`)
      const data = await response.json()
      setPayment(data)
    } catch (error) {
      console.error('Error fetching payment:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePay = () => {
    if (!payment) return

    sendTransaction({
      to: OPM_TOKEN_ADDRESS,
      value: parseEther(payment.amount.toString()),
    })
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[#D4A537]" />
      </div>
    )
  }

  if (!payment) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Payment Not Found</CardTitle>
            <CardDescription>The payment you're looking for doesn't exist or has expired.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-background/95 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Complete Payment</CardTitle>
          <CardDescription>Pay with OPM tokens to complete your transaction</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between rounded-lg bg-muted p-4">
            <span className="font-medium">Amount:</span>
            <span className="font-bold text-[#D4A537]">{payment.amount} OPM</span>
          </div>

          {payment.description && (
            <div className="rounded-lg bg-muted p-4">
              <span className="font-medium">Description:</span>
              <p className="mt-1 text-muted-foreground">{payment.description}</p>
            </div>
          )}

          {!isConnected && (
            <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4">
              <p className="text-sm text-yellow-600 dark:text-yellow-400">Please connect your wallet to continue</p>
            </div>
          )}

          {isSuccess && (
            <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-4">
              <p className="text-sm text-green-600 dark:text-green-400">Payment completed successfully!</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="gold" className="w-full" onClick={handlePay} disabled={!isConnected || isConfirming || isSuccess}>
            {isConfirming ? 'Confirming...' : isSuccess ? 'Paid' : 'Pay Now'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
