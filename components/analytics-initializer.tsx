'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import AnalyticsService from '@/lib/analytics/analytics-service'
import GDPRService from '@/lib/compliance/gdpr-service'

/**
 * Initializes analytics and tracks page views
 * Respects GDPR consent settings
 */
export function AnalyticsInitializer() {
  const pathname = usePathname()

  useEffect(() => {
    // Initialize analytics on mount
    AnalyticsService.initialize()

    // Get user email and check consent
    const userEmail = localStorage.getItem('aurexia-email')
    
    if (userEmail) {
      // Set user properties
      AnalyticsService.setUserProperties({
        email: userEmail,
        userId: `user-${userEmail}`,
        clearanceLevel: localStorage.getItem('aurexia-clearance') || 'unknown',
      })

      // Check GDPR consent for analytics
      const hasConsent = GDPRService.hasConsent(userEmail, 'analytics')
      AnalyticsService.setAnalyticsConsent(hasConsent)
    }
  }, [])

  useEffect(() => {
    // Track page view on route change
    AnalyticsService.trackPageView({
      path: pathname,
      title: document.title,
      referrer: document.referrer,
      timestamp: new Date(),
    })
  }, [pathname])

  return null
}

export default AnalyticsInitializer
