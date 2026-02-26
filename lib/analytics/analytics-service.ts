/**
 * Analytics Service
 * Integrates with Google Analytics 4 and custom event tracking
 */

export interface AnalyticsEvent {
  name: string
  parameters: Record<string, any>
  timestamp: Date
}

export interface PageView {
  path: string
  title: string
  referrer?: string
  timestamp: Date
}

export interface UserProperties {
  userId?: string
  email?: string
  clearanceLevel?: string
  accountAge?: number
  isSubscribed?: boolean
}

export class AnalyticsService {
  private static initialized = false
  private static userProperties: UserProperties = {}
  private static eventQueue: AnalyticsEvent[] = []

  /**
   * Initialize analytics
   */
  static initialize(): void {
    if (this.initialized) return

    // Load Google Analytics 4
    if (typeof window !== 'undefined') {
      // Add GA4 script
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}`
      document.head.appendChild(script)

      // Initialize gtag
      ;(window as any).dataLayer = (window as any).dataLayer || []
      function gtag(this: any, ...args: any[]) {
        ;(window as any).dataLayer.push(arguments)
      }
      ;(window as any).gtag = gtag
      ;(window as any).gtag('js', new Date())
      ;(window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX')

      this.initialized = true
    }
  }

  /**
   * Set user properties
   */
  static setUserProperties(properties: UserProperties): void {
    this.userProperties = { ...this.userProperties, ...properties }

    // Send to GA4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('set', {
        user_id: properties.userId,
        custom_map: {
          dimension1: 'clearance_level',
          dimension2: 'email',
        },
        clearance_level: properties.clearanceLevel,
        email: properties.email,
      })
    }
  }

  /**
   * Track page view
   */
  static trackPageView(pageView: PageView): void {
    this.initialize()

    // Queue local event
    this.eventQueue.push({
      name: 'page_view',
      parameters: {
        page_path: pageView.path,
        page_title: pageView.title,
        page_referrer: pageView.referrer,
      },
      timestamp: pageView.timestamp,
    })

    // Send to GA4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'page_view', {
        page_path: pageView.path,
        page_title: pageView.title,
        page_referrer: pageView.referrer,
      })
    }

    // Console log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics] Page View:', pageView.path)
    }
  }

  /**
   * Track custom event
   */
  static trackEvent(
    eventName: string,
    parameters?: Record<string, any>
  ): void {
    this.initialize()

    const event: AnalyticsEvent = {
      name: eventName,
      parameters: parameters || {},
      timestamp: new Date(),
    }

    // Queue local event
    this.eventQueue.push(event)

    // Send to GA4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', eventName, parameters || {})
    }

    // Console log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] Event: ${eventName}`, parameters)
    }
  }

  /**
   * Track user action
   */
  static trackUserAction(
    action: string,
    category: string,
    label?: string
  ): void {
    this.trackEvent(`user_action`, {
      action,
      category,
      label,
    })
  }

  /**
   * Track login
   */
  static trackLogin(method: string, email?: string): void {
    this.trackEvent('login', {
      method,
      email,
    })
  }

  /**
   * Track dashboard access
   */
  static trackDashboardAccess(section: string): void {
    this.trackEvent('dashboard_access', {
      section,
    })
  }

  /**
   * Track navigation
   */
  static trackNavigation(from: string, to: string): void {
    this.trackEvent('navigation', {
      from,
      to,
    })
  }

  /**
   * Track feature usage
   */
  static trackFeatureUsage(feature: string, action: string): void {
    this.trackEvent('feature_usage', {
      feature,
      action,
    })
  }

  /**
   * Track error
   */
  static trackError(
    errorType: string,
    errorMessage: string,
    errorSeverity: 'low' | 'medium' | 'high'
  ): void {
    this.trackEvent('error', {
      error_type: errorType,
      error_message: errorMessage,
      error_severity: errorSeverity,
    })
  }

  /**
   * Track engagement (scroll, click, focus)
   */
  static trackEngagement(engagementType: string, target?: string): void {
    this.trackEvent('engagement', {
      engagement_type: engagementType,
      target,
    })
  }

  /**
   * Get event queue (for offline support)
   */
  static getEventQueue(): AnalyticsEvent[] {
    return [...this.eventQueue]
  }

  /**
   * Clear event queue
   */
  static clearEventQueue(): void {
    this.eventQueue = []
  }

  /**
   * Get session duration
   */
  static getSessionDuration(): number {
    const sessionStart = sessionStorage.getItem('analytics-session-start')
    if (!sessionStart) {
      sessionStorage.setItem('analytics-session-start', Date.now().toString())
      return 0
    }
    return Date.now() - parseInt(sessionStart)
  }

  /**
   * Get user properties
   */
  static getUserProperties(): UserProperties {
    return { ...this.userProperties }
  }

  /**
   * Track conversion
   */
  static trackConversion(
    conversionType: string,
    conversionValue?: number
  ): void {
    this.trackEvent('conversion', {
      conversion_type: conversionType,
      conversion_value: conversionValue,
    })
  }

  /**
   * Enable/disable analytics based on consent
   */
  static setAnalyticsConsent(hasConsent: boolean): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('consent', 'update', {
        analytics_storage: hasConsent ? 'granted' : 'denied',
        ad_storage: hasConsent ? 'granted' : 'denied',
      })
    }
  }

  /**
   * Get analytics summary
   */
  static getSummary(): {
    totalEvents: number
    pageViews: number
    sessionDuration: number
    userProperties: UserProperties
  } {
    const pageViews = this.eventQueue.filter((e) => e.name === 'page_view').length

    return {
      totalEvents: this.eventQueue.length,
      pageViews,
      sessionDuration: this.getSessionDuration(),
      userProperties: this.getUserProperties(),
    }
  }
}

export default AnalyticsService
