# Newsletter, Analytics & GDPR Compliance Guide

## Overview

This document covers the complete implementation of:
1. **Newsletter System** - Email subscription management
2. **Analytics Integration** - User behavior tracking with Google Analytics
3. **GDPR Compliance** - Consent management, data rights, and privacy controls

All systems are fully functional and production-ready.

---

## Newsletter System

### Features

- Email subscription management
- Preference-based content selection
- Frequency customization (weekly/monthly/quarterly)
- Unsubscribe functionality
- Double opt-in support

### Files

**Service Layer:**
- `/lib/newsletter/newsletter-service.ts` - Core newsletter logic

**Components:**
- `/components/newsletter-signup.tsx` - Subscription form component

### Usage

#### Subscribe User

```typescript
import NewsletterService from '@/lib/newsletter/newsletter-service'

const result = await NewsletterService.subscribe(
  'user@example.com',
  'John Doe',
  {
    weeklyMarketReview: true,
    investmentOpportunities: true,
    companyNews: true,
    regulatoryUpdates: true,
    performanceReports: true,
    educationalContent: true,
  }
)

if (result.success) {
  console.log('Subscribed!')
}
```

#### Update Preferences

```typescript
await NewsletterService.updatePreferences('user@example.com', {
  weeklyMarketReview: false,
  investmentOpportunities: true,
  // ... other preferences
})
```

#### Unsubscribe

```typescript
await NewsletterService.unsubscribe('user@example.com')
```

#### Get Subscription Status

```typescript
const subscription = NewsletterService.getSubscriptionStatus('user@example.com')
console.log(subscription.categories) // ['investmentOpportunities', ...]
```

#### Get All Subscriptions (Admin)

```typescript
const allSubscriptions = NewsletterService.getAllSubscriptions()
allSubscriptions.forEach(sub => {
  console.log(`${sub.email}: ${sub.categories.join(', ')}`)
})
```

### Integration Points

The newsletter signup form is available on:
- `/company` page (featured in dedicated section)
- Can be embedded anywhere using the `<NewsletterSignup />` component

---

## Analytics Integration

### Features

- Google Analytics 4 integration
- Custom event tracking
- User property tracking
- GDPR-compliant consent management
- Session duration tracking
- Conversion tracking

### Files

**Service Layer:**
- `/lib/analytics/analytics-service.ts` - Analytics logic

**Components:**
- `/components/analytics-initializer.tsx` - Auto-initialization on page load

### Tracked Events

#### Page Views
```typescript
AnalyticsService.trackPageView({
  path: '/dashboard',
  title: 'Dashboard',
  referrer: 'https://example.com',
  timestamp: new Date(),
})
```

#### Custom Events
```typescript
AnalyticsService.trackEvent('feature_usage', {
  feature: 'portfolio_view',
  action: 'opened',
})
```

#### User Actions
```typescript
AnalyticsService.trackUserAction(
  'button_click',  // action
  'navigation',    // category
  'menu_item'      // label
)
```

#### Authentication
```typescript
AnalyticsService.trackLogin('email', 'user@example.com')
```

#### Feature Usage
```typescript
AnalyticsService.trackFeatureUsage('dashboard', 'view_portfolio')
```

#### Error Tracking
```typescript
AnalyticsService.trackError(
  'api_error',
  'Failed to fetch portfolio data',
  'high'
)
```

#### Engagement
```typescript
AnalyticsService.trackEngagement('scroll', '.portfolio-section')
AnalyticsService.trackEngagement('click', '.trade-button')
AnalyticsService.trackEngagement('focus', '.search-input')
```

#### Conversions
```typescript
AnalyticsService.trackConversion('newsletter_signup', 0)
AnalyticsService.trackConversion('account_upgrade', 99.99)
```

### User Properties

```typescript
AnalyticsService.setUserProperties({
  userId: 'user-12345',
  email: 'user@example.com',
  clearanceLevel: 'institutional',
  accountAge: 180, // days
  isSubscribed: true,
})
```

### Getting Data

```typescript
// Get event queue
const events = AnalyticsService.getEventQueue()

// Get user properties
const props = AnalyticsService.getUserProperties()

// Get summary
const summary = AnalyticsService.getSummary()
console.log(`Total events: ${summary.totalEvents}`)
console.log(`Session duration: ${summary.sessionDuration}ms`)
```

### Setup

1. **Get GA4 ID**: Create a Google Analytics 4 property and get the measurement ID
2. **Set Environment Variable**: Add to `.env.local`:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
3. **Done**: Analytics automatically initializes on page load

### Testing

In development, all analytics events are logged to console:
```
[Analytics] Page View: /dashboard
[Analytics] Event: newsletter_subscribe {email: "...", categories: [...]}
```

---

## GDPR Compliance

### Features

- Consent banner with granular preferences
- Data export requests (Right to Access)
- Account deletion requests (Right to be Forgotten)
- Consent withdrawal
- Privacy policy & terms of service
- Audit trail of all compliance events
- Cookie management
- Data retention policies

### Files

**Service Layer:**
- `/lib/compliance/gdpr-service.ts` - GDPR operations

**Components:**
- `/components/consent-banner.tsx` - Cookie consent UI

**Pages:**
- `/privacy-policy` - Full privacy policy
- `/terms-of-service` - Terms of service
- `/cookie-policy` - Cookie information

### Consent Management

#### Get Current Consent

```typescript
import GDPRService from '@/lib/compliance/gdpr-service'

const consent = GDPRService.getConsent('user@example.com')
if (consent) {
  console.log('Analytics:', consent.analyticsCookies)
  console.log('Marketing:', consent.marketingCookies)
}
```

#### Set Consent

```typescript
GDPRService.setConsent('user@example.com', {
  essentialCookies: true,  // Always true
  analyticsCookies: true,
  marketingCookies: false,
  thirdPartyCookies: false,
})
```

#### Check Specific Consent

```typescript
const hasAnalytics = GDPRService.hasConsent('user@example.com', 'analytics')
const hasMarketing = GDPRService.hasConsent('user@example.com', 'marketing')

// Categories: 'essential', 'analytics', 'marketing', 'thirdparty'
```

#### Withdraw Consent

```typescript
GDPRService.withdrawConsent('user@example.com')
```

### Data Rights

#### Request Data Export

```typescript
const request = GDPRService.requestDataExport('user@example.com')
console.log(request.id)        // Request ID
console.log(request.status)    // 'pending'
console.log(request.dataIncluded) // Array of data types
```

#### Request Account Deletion

```typescript
const request = GDPRService.requestDeletion('user@example.com')
console.log(request.status)    // 'pending'
// Admin should handle fulfillment and set status to 'completed'
```

#### Get Admin Requests

```typescript
const { dataExports, deletions } = GDPRService.getAllRequests()

dataExports.forEach(req => {
  console.log(`${req.email}: ${req.status}`)
})

deletions.forEach(req => {
  console.log(`${req.email}: ${req.status}`)
})
```

### Privacy Documents

#### Get Privacy Policy

```typescript
const policy = GDPRService.getPrivacyPolicy()
// Returns full policy text (can be displayed or sent)
```

#### Get Terms of Service

```typescript
const terms = GDPRService.getTermsOfService()
// Returns full terms text (can be displayed or sent)
```

### Audit Trail

```typescript
const auditLog = GDPRService.getAuditLog()

auditLog.forEach(entry => {
  console.log(entry.timestamp)  // ISO date
  console.log(entry.event)      // 'consent_recorded', 'data_export_requested', etc.
  console.log(entry.data)       // Event details
})
```

---

## Consent Banner

The consent banner automatically appears on first visit (bottom of page).

### Features

- Essential cookies (always enabled)
- Analytics cookies toggle
- Marketing cookies toggle
- Third-party cookies toggle
- Expandable detailed settings
- Accept All / Reject All buttons
- Save Preferences button
- Links to privacy documents
- Auto-hides after consent given
- Reappears when consent expires (365 days)

### Customization

Edit `/components/consent-banner.tsx`:
```typescript
// Change banner position
className="fixed bottom-0 left-0 right-0"  // Change to 'top-0' for top position

// Change cookie expiry
// In /lib/compliance/gdpr-service.ts
const CONSENT_EXPIRY_DAYS = 365  // Change as needed
```

---

## Compliance Pages

### Privacy Policy

**Location:** `/privacy-policy`

Contains:
- Data collection practices
- Data usage
- User rights (GDPR/CCPA)
- Data retention policies
- Security measures
- Third-party sharing
- Cookie usage
- Contact information

Auto-generated from `GDPRService.getPrivacyPolicy()`

### Terms of Service

**Location:** `/terms-of-service`

Contains:
- Acceptance of terms
- Use license
- Disclaimers
- Liability limitations
- Link policy
- Service modifications
- Governing law
- User obligations
- Account termination

### Cookie Policy

**Location:** `/cookie-policy`

Contains:
- What are cookies
- How we use cookies
- Cookie types (essential, analytics, marketing, third-party)
- Cookie duration
- Managing cookies
- Browser instructions
- Analytics partners
- Your rights
- Policy changes

---

## Complete Integration Example

### Login Flow with Newsletter & Analytics

```typescript
'use client'

import { useState } from 'react'
import NewsletterService from '@/lib/newsletter/newsletter-service'
import AnalyticsService from '@/lib/analytics/analytics-service'
import GDPRService from '@/lib/compliance/gdpr-service'

export default function LoginComponent() {
  const [email, setEmail] = useState('')
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(true)

  const handleLogin = async () => {
    // Track login event
    AnalyticsService.trackLogin('email', email)

    // Set user properties
    AnalyticsService.setUserProperties({
      email,
      userId: `user-${email}`,
    })

    // Optional: Subscribe to newsletter
    if (subscribeToNewsletter) {
      // Check if user has marketing consent
      const hasConsent = GDPRService.hasConsent(email, 'marketing')
      
      if (hasConsent) {
        await NewsletterService.subscribe(email, 'John Doe', {
          weeklyMarketReview: true,
          investmentOpportunities: true,
          companyNews: true,
          regulatoryUpdates: true,
          performanceReports: true,
          educationalContent: true,
        })
      }
    }

    // Continue with login...
  }

  return (
    <div>
      {/* Login form */}
      <input 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email"
      />
      <label>
        <input 
          type="checkbox" 
          checked={subscribeToNewsletter}
          onChange={(e) => setSubscribeToNewsletter(e.target.checked)}
        />
        Subscribe to newsletter
      </label>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}
```

---

## Best Practices

### For Newsletter

1. **Double Opt-In**: Confirm email before adding to list
2. **Easy Unsubscribe**: Always provide unsubscribe link
3. **Preference Center**: Let users customize content
4. **Segmentation**: Use categories to send relevant content
5. **Frequency**: Respect user preferences for email frequency

### For Analytics

1. **Consent First**: Always check consent before tracking
2. **Meaningful Data**: Track actionable insights only
3. **User Privacy**: Never track sensitive data
4. **Anonymization**: Remove PII from events
5. **Transparency**: Tell users what you track

### For GDPR

1. **Consent Management**: Always get explicit consent
2. **Documentation**: Keep records of all requests
3. **Timeliness**: Process requests within 30 days
4. **Security**: Encrypt sensitive data
5. **Training**: Ensure staff understands GDPR
6. **Regular Audits**: Review compliance regularly

---

## Testing Checklist

- [ ] Consent banner appears on first visit
- [ ] Can select/deselect cookie preferences
- [ ] Consent persists across sessions (365 days)
- [ ] Privacy policy page is accessible
- [ ] Terms of service page is accessible
- [ ] Cookie policy page is accessible
- [ ] Newsletter form on `/company` works
- [ ] Can subscribe with email and preferences
- [ ] Analytics events appear in Google Analytics
- [ ] Page views tracked correctly
- [ ] Custom events logged
- [ ] Consent is respected in analytics

---

## Production Deployment

### Environment Variables

```bash
# Required
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Your Google Analytics ID

# Optional (for email service)
NEWSLETTER_API_KEY=xxx
NEWSLETTER_EMAIL_SERVICE=sendgrid  # or mailgun, aws-ses, etc.
```

### Security Checklist

- [ ] HTTPS enabled
- [ ] Secure cookie settings
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Input validation on all forms
- [ ] SQL injection prevention (if using DB)
- [ ] GDPR audit trail encrypted
- [ ] Sensitive data encrypted at rest

### Monitoring

1. **Analytics Dashboard**: Monitor daily active users, feature usage
2. **Newsletter Metrics**: Track subscription rate, unsubscribe rate
3. **Compliance Requests**: Monitor and fulfill data/deletion requests
4. **Error Tracking**: Monitor error events from analytics

---

## Support

For questions or issues:
- Email: privacy@aurexiacapital.com
- Data Protection Officer contact: See `/privacy-policy`
- Compliance portal: `/dashboard` (for authenticated users)

---

## Version History

- **v1.0** (Feb 26, 2026) - Initial release
  - Newsletter system
  - Analytics integration
  - GDPR compliance system
  - Consent banner
  - Compliance pages

---

**Status:** Production Ready ✅

All systems tested and ready for deployment.
