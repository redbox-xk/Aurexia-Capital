import { NextResponse } from 'next/server'
import { ethers } from 'ethers'
import { z } from 'zod'

const paymentSchema = z.object({
  merchantId: z.string(),
  amount: z.number().positive(),
  tokenAddress: z.string(),
  description: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = paymentSchema.parse(body)

    const paymentId = ethers.id(`${validated.merchantId}-${validated.amount}-${Date.now()}`)

    const paymentUrl = `${process.env.NEXT_PUBLIC_APP_URL}/pay/${paymentId}`

    const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(paymentUrl)}`

    return NextResponse.json({
      success: true,
      paymentId,
      qrCode,
      paymentUrl,
      amount: validated.amount,
      description: validated.description,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    })
  } catch (error) {
    console.error('Payment creation error:', error)
    return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 })
  }
}
