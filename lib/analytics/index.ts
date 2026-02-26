export interface AnalyticsEvent {
  eventName: string
  properties?: Record<string, any>
  timestamp: Date
  sessionId: string
  userId?: string
}

class Analytics {
  private sessionId: string = ''

  constructor() {
    if (typeof window !== 'undefined') {
      this.sessionId =
        sessionStorage.getItem('analytics_session_id') ||
        `session_${Date.now()}_${Math.random()}`
      sessionStorage.setItem('analytics_session_id', this.sessionId)
    }
  }

  track(eventName: string, properties?: Record<string, any>) {
    const event: AnalyticsEvent = {
      eventName,
      properties,
      timestamp: new Date(),
      sessionId: this.sessionId,
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', event)
    }

    // In production, send to analytics service (Segment, Mixpanel, Vercel Analytics, etc.)
    this.sendEvent(event)
  }

  pageView(pagePath: string, pageTitle?: string) {
    this.track('page_view', {
      pagePath,
      pageTitle,
    })
  }

  buttonClick(buttonText: string, buttonLocation?: string) {
    this.track('button_click', {
      buttonText,
      buttonLocation,
    })
  }

  formSubmit(formName: string, formFields?: string[]) {
    this.track('form_submit', {
      formName,
      formFields,
    })
  }

  documentDownload(documentName: string, documentId: string) {
    this.track('document_download', {
      documentName,
      documentId,
    })
  }

  contactForm(name: string, email: string, subject: string) {
    this.track('contact_form_submit', {
      name,
      email,
      subject,
    })
  }

  private sendEvent(event: AnalyticsEvent) {
    try {
      // In production, implement actual analytics service integration
      // Examples:
      // - Vercel Analytics: https://vercel.com/analytics
      // - Google Analytics
      // - Segment
      // - Mixpanel
      // - Custom backend endpoint

      // For now, we'll just log it
      if (typeof window !== 'undefined' && navigator.sendBeacon) {
        // Use sendBeacon to send analytics even if page is unloading
        navigator.sendBeacon(
          '/api/analytics',
          JSON.stringify(event)
        )
      }
    } catch (error) {
      console.error('Failed to send analytics event:', error)
    }
  }
}

// Export singleton instance
export const analytics = new Analytics()

// GDPR Compliance tracking
export interface GDPRConsent {
  analytics: boolean
  marketing: boolean
  personalization: boolean
  timestamp: Date
}

export function getGDPRConsent(): GDPRConsent | null {
  if (typeof window === 'undefined') return null

  const stored = localStorage.getItem('gdpr_consent')
  if (!stored) return null

  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}

export function setGDPRConsent(consent: GDPRConsent) {
  if (typeof window === 'undefined') return

  localStorage.setItem('gdpr_consent', JSON.stringify(consent))

  // Only track analytics if user consented
  if (consent.analytics) {
    analytics.track('gdpr_consent_given', {
      analytics: true,
      marketing: consent.marketing,
      personalization: consent.personalization,
    })
  }
}

export function clearGDPRConsent() {
  if (typeof window === 'undefined') return

  localStorage.removeItem('gdpr_consent')
  analytics.track('gdpr_consent_withdrawn')
}
