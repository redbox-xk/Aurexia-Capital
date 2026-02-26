import { NextRequest, NextResponse } from 'next/server'
import { subscribeNewsletter } from '@/lib/newsletter'

export async function POST(request: NextRequest) {
  try {
    const { email, gdprConsent } = await request.json()

    if (!email || !gdprConsent) {
      return NextResponse.json(
        { error: 'Email and GDPR consent are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const result = await subscribeNewsletter(email, gdprConsent)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    )
  }
}
