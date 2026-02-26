'use client'

import { useState, useEffect } from 'react'
import { X, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import GDPRService from '@/lib/compliance/gdpr-service'

export function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [email, setEmail] = useState('')
  const [preferences, setPreferences] = useState({
    essentialCookies: true,
    analyticsCookies: true,
    marketingCookies: true,
    thirdPartyCookies: false,
  })

  useEffect(() => {
    // Get user email from session
    const userEmail = localStorage.getItem('aurexia-email')
    if (userEmail) {
      setEmail(userEmail)
      // Check if consent already given
      const existingConsent = GDPRService.getConsent(userEmail)
      if (!existingConsent) {
        setIsVisible(true)
      }
    }
  }, [])

  const handleAcceptAll = () => {
    if (email) {
      GDPRService.setConsent(email, {
        essentialCookies: true,
        analyticsCookies: true,
        marketingCookies: true,
        thirdPartyCookies: true,
      })
    }
    setIsVisible(false)
  }

  const handleRejectAll = () => {
    if (email) {
      GDPRService.setConsent(email, {
        essentialCookies: true,
        analyticsCookies: false,
        marketingCookies: false,
        thirdPartyCookies: false,
      })
    }
    setIsVisible(false)
  }

  const handleSavePreferences = () => {
    if (email) {
      GDPRService.setConsent(email, preferences)
    }
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h3 className="text-base font-semibold mb-2">Privacy & Cookie Settings</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We use cookies to enhance your experience. You have full control over your preferences.
            </p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 p-1 hover:bg-muted rounded transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Expandable Details */}
        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-2 text-sm text-primary hover:underline mb-4"
          >
            View detailed settings
            <ChevronDown className="w-4 h-4" />
          </button>
        )}

        {isExpanded && (
          <div className="bg-muted/50 rounded p-4 mb-4 space-y-4">
            {/* Essential Cookies */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={preferences.essentialCookies}
                disabled
                className="mt-1"
              />
              <div className="flex-1">
                <label className="font-medium text-sm block">Essential Cookies</label>
                <p className="text-xs text-muted-foreground">
                  Required for basic functionality. Cannot be disabled.
                </p>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={preferences.analyticsCookies}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    analyticsCookies: e.target.checked,
                  })
                }
                className="mt-1"
              />
              <div className="flex-1">
                <label className="font-medium text-sm block">Analytics Cookies</label>
                <p className="text-xs text-muted-foreground">
                  Help us understand how you use our platform. Completely anonymous.
                </p>
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={preferences.marketingCookies}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    marketingCookies: e.target.checked,
                  })
                }
                className="mt-1"
              />
              <div className="flex-1">
                <label className="font-medium text-sm block">Marketing Cookies</label>
                <p className="text-xs text-muted-foreground">
                  Allow us to personalize content and show relevant offers.
                </p>
              </div>
            </div>

            {/* Third Party Cookies */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={preferences.thirdPartyCookies}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    thirdPartyCookies: e.target.checked,
                  })
                }
                className="mt-1"
              />
              <div className="flex-1">
                <label className="font-medium text-sm block">Third-Party Cookies</label>
                <p className="text-xs text-muted-foreground">
                  Partner integrations and enhanced features.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsExpanded(false)}
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              Hide details
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleRejectAll} className="flex-1">
            Reject Non-Essential
          </Button>
          {isExpanded && (
            <Button onClick={handleSavePreferences} className="flex-1">
              Save Preferences
            </Button>
          )}
          <Button onClick={handleAcceptAll} className="flex-1">
            Accept All
          </Button>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4 justify-center mt-4 text-xs text-muted-foreground">
          <a href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="hover:underline">
            Terms of Service
          </a>
          <a href="/cookie-policy" className="hover:underline">
            Cookie Policy
          </a>
        </div>
      </div>
    </div>
  )
}

export default ConsentBanner
