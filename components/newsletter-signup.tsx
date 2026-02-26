'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, CheckCircle, AlertCircle } from 'lucide-react'
import NewsletterService, { NewsletterPreferences } from '@/lib/newsletter/newsletter-service'

interface NewsletterSignupProps {
  title?: string
  description?: string
  variant?: 'card' | 'inline'
  onSuccess?: () => void
}

export function NewsletterSignup({
  title = 'Stay Informed',
  description = 'Subscribe to our institutional insights',
  variant = 'card',
  onSuccess,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [preferences, setPreferences] = useState<NewsletterPreferences>({
    weeklyMarketReview: true,
    investmentOpportunities: true,
    companyNews: true,
    regulatoryUpdates: true,
    performanceReports: true,
    educationalContent: true,
  })
  const [showPreferences, setShowPreferences] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus('idle')

    const result = await NewsletterService.subscribe(email, name, preferences)

    if (result.success) {
      setStatus('success')
      setMessage(result.message)
      setEmail('')
      setName('')
      onSuccess?.()
    } else {
      setStatus('error')
      setMessage(result.message)
    }

    setIsLoading(false)
  }

  const content = (
    <form onSubmit={handleSubscribe} className="space-y-4">
      {status === 'success' && (
        <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded p-3 flex gap-2">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-green-900 dark:text-green-100">
              Subscription Confirmed
            </p>
            <p className="text-xs text-green-800 dark:text-green-200">{message}</p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded p-3 flex gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-900 dark:text-red-100">
              Subscription Failed
            </p>
            <p className="text-xs text-red-800 dark:text-red-200">{message}</p>
          </div>
        </div>
      )}

      {status !== 'success' && (
        <>
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-3 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-3 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
              disabled={isLoading}
            />
          </div>

          {/* Preferences Toggle */}
          <button
            type="button"
            onClick={() => setShowPreferences(!showPreferences)}
            className="text-sm text-primary hover:underline"
          >
            {showPreferences ? 'Hide' : 'Choose'} newsletter topics
          </button>

          {/* Preferences */}
          {showPreferences && (
            <div className="bg-muted/50 rounded p-3 space-y-2">
              {(Object.keys(preferences) as Array<keyof NewsletterPreferences>).map(
                (key) => (
                  <label key={key} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={preferences[key]}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          [key]: e.target.checked,
                        })
                      }
                      className="rounded"
                    />
                    <span>
                      {key
                        .replace(/([A-Z])/g, ' $1')
                        .trim()
                        .charAt(0)
                        .toUpperCase() +
                        key
                          .replace(/([A-Z])/g, ' $1')
                          .trim()
                          .slice(1)}
                    </span>
                  </label>
                )
              )}
            </div>
          )}

          <Button
            type="submit"
            className="w-full gap-2"
            disabled={isLoading || !email || !name}
          >
            <Mail className="w-4 h-4" />
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </>
      )}
    </form>
  )

  if (variant === 'inline') {
    return <div>{content}</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="w-5 h-5" />
          {title}
        </CardTitle>
        {description && <p className="text-sm text-muted-foreground mt-2">{description}</p>}
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  )
}

export default NewsletterSignup
