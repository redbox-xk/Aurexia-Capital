'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { getGDPRConsent, setGDPRConsent } from '@/lib/analytics'

export function GDPRBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [accepted, setAccepted] = useState(false)

  useEffect(() => {
    const consent = getGDPRConsent()
    if (!consent) {
      setIsVisible(true)
    } else {
      setAccepted(true)
    }
  }, [])

  const handleAccept = () => {
    setGDPRConsent({
      analytics: true,
      marketing: true,
      personalization: true,
      timestamp: new Date(),
    })
    setIsVisible(false)
    setAccepted(true)
  }

  const handleReject = () => {
    setGDPRConsent({
      analytics: false,
      marketing: false,
      personalization: false,
      timestamp: new Date(),
    })
    setIsVisible(false)
  }

  if (!isVisible || accepted) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-foreground text-primary-foreground border-t border-primary/30 z-50 animate-in slide-in-from-bottom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-start justify-between gap-4 sm:items-center">
          <div className="flex-1">
            <h3 className="font-semibold mb-2">Privacy & GDPR Compliance</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              We use cookies and analytics to improve your experience. By continuing to use our site, you agree to our{' '}
              <a href="/privacy" className="underline hover:opacity-80 transition">
                Privacy Policy
              </a>
              {' '}and{' '}
              <a href="/terms" className="underline hover:opacity-80 transition">
                Terms of Service
              </a>
              . Your data is protected in accordance with GDPR.
            </p>
          </div>

          <div className="flex gap-3 items-start flex-shrink-0 mt-4 sm:mt-0">
            <Button
              size="sm"
              variant="outline"
              onClick={handleReject}
              className="border-primary-foreground/30 hover:bg-primary-foreground/10"
            >
              Reject
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="bg-secondary hover:bg-secondary/90 text-foreground"
            >
              Accept
            </Button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1.5 hover:bg-primary-foreground/10 rounded transition flex-shrink-0"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
