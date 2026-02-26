/**
 * Newsletter Service
 * Manages subscriptions, preferences, and campaigns
 */

export interface NewsletterSubscriber {
  id: string
  email: string
  name: string
  subscriptionDate: Date
  preferredFrequency: 'weekly' | 'monthly' | 'quarterly'
  categories: string[]
  isActive: boolean
  gdprConsent: boolean
  marketingConsent: boolean
  lastEmailDate?: Date
}

export interface NewsletterPreferences {
  weeklyMarketReview: boolean
  investmentOpportunities: boolean
  companyNews: boolean
  regulatoryUpdates: boolean
  performanceReports: boolean
  educationalContent: boolean
}

export class NewsletterService {
  /**
   * Subscribe to newsletter
   */
  static async subscribe(
    email: string,
    name: string,
    preferences: NewsletterPreferences
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return { success: false, message: 'Invalid email format' }
      }

      // Check if already subscribed
      const existing = localStorage.getItem(`newsletter-${email}`)
      if (existing) {
        return { success: false, message: 'Already subscribed' }
      }

      // Create subscription record
      const subscription: NewsletterSubscriber = {
        id: `subscriber-${Date.now()}`,
        email,
        name,
        subscriptionDate: new Date(),
        preferredFrequency: 'monthly',
        categories: Object.keys(preferences).filter(
          (key) => preferences[key as keyof NewsletterPreferences]
        ),
        isActive: true,
        gdprConsent: true,
        marketingConsent: true,
      }

      // Store subscription
      localStorage.setItem(
        `newsletter-${email}`,
        JSON.stringify(subscription)
      )

      // Log analytics event
      this.logEvent('newsletter_subscribe', {
        email,
        categories: subscription.categories,
      })

      return {
        success: true,
        message: 'Successfully subscribed to newsletter',
      }
    } catch (error) {
      return { success: false, message: 'Subscription failed' }
    }
  }

  /**
   * Update subscription preferences
   */
  static async updatePreferences(
    email: string,
    preferences: Partial<NewsletterPreferences>
  ): Promise<{ success: boolean; message: string }> {
    try {
      const data = localStorage.getItem(`newsletter-${email}`)
      if (!data) {
        return { success: false, message: 'Subscription not found' }
      }

      const subscription = JSON.parse(data) as NewsletterSubscriber
      subscription.categories = Object.keys(preferences).filter(
        (key) => preferences[key as keyof NewsletterPreferences]
      )

      localStorage.setItem(
        `newsletter-${email}`,
        JSON.stringify(subscription)
      )

      this.logEvent('newsletter_preferences_updated', {
        email,
        categories: subscription.categories,
      })

      return { success: true, message: 'Preferences updated' }
    } catch (error) {
      return { success: false, message: 'Update failed' }
    }
  }

  /**
   * Unsubscribe from newsletter
   */
  static async unsubscribe(email: string): Promise<{ success: boolean }> {
    try {
      const data = localStorage.getItem(`newsletter-${email}`)
      if (!data) {
        return { success: false }
      }

      const subscription = JSON.parse(data) as NewsletterSubscriber
      subscription.isActive = false

      localStorage.setItem(
        `newsletter-${email}`,
        JSON.stringify(subscription)
      )

      this.logEvent('newsletter_unsubscribe', { email })

      return { success: true }
    } catch (error) {
      return { success: false }
    }
  }

  /**
   * Get subscription status
   */
  static getSubscriptionStatus(email: string): NewsletterSubscriber | null {
    try {
      const data = localStorage.getItem(`newsletter-${email}`)
      return data ? JSON.parse(data) : null
    } catch (error) {
      return null
    }
  }

  /**
   * Get all subscriptions (admin)
   */
  static getAllSubscriptions(): NewsletterSubscriber[] {
    try {
      const subscriptions: NewsletterSubscriber[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith('newsletter-')) {
          const data = localStorage.getItem(key)
          if (data) {
            subscriptions.push(JSON.parse(data))
          }
        }
      }
      return subscriptions
    } catch (error) {
      return []
    }
  }

  /**
   * Log analytics event
   */
  private static logEvent(eventName: string, data: any): void {
    // Send to analytics service (GA4, Mixpanel, etc.)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, data)
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] ${eventName}`, data)
    }
  }
}

export default NewsletterService
