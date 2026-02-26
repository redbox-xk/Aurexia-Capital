import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const paymentId = params.id

    return NextResponse.json({
      paymentId,
      status: 'pending',
      confirmations: 0,
      amount: 0.1,
      createdAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Payment status error:', error)
    return NextResponse.json({ error: 'Failed to get payment status' }, { status: 500 })
  }
}
