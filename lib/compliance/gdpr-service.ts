/**
 * GDPR Compliance Service
 * Manages consent, data export, and privacy controls
 */

export interface GDPRConsent {
  id: string
  email: string
  timestamp: Date
  essentialCookies: boolean
  analyticsCookies: boolean
  marketingCookies: boolean
  thirdPartyCookies: boolean
  version: string
}

export interface DataExportRequest {
  id: string
  email: string
  requestDate: Date
  completedDate?: Date
  status: 'pending' | 'processing' | 'completed'
  dataIncluded: string[]
}

export interface DeletionRequest {
  id: string
  email: string
  requestDate: Date
  completedDate?: Date
  status: 'pending' | 'processing' | 'completed'
}

const CONSENT_VERSION = '1.0'
const CONSENT_EXPIRY_DAYS = 365

export class GDPRService {
  /**
   * Get current consent status
   */
  static getConsent(email: string): GDPRConsent | null {
    try {
      const data = localStorage.getItem(`gdpr-consent-${email}`)
      if (!data) return null

      const consent = JSON.parse(data) as GDPRConsent
      const consentDate = new Date(consent.timestamp)
      const expiryDate = new Date(
        consentDate.getTime() + CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000
      )

      // Check if consent has expired
      if (new Date() > expiryDate) {
        return null // Consent expired, needs renewal
      }

      return consent
    } catch (error) {
      return null
    }
  }

  /**
   * Set consent preferences
   */
  static setConsent(
    email: string,
    preferences: {
      essentialCookies: boolean
      analyticsCookies: boolean
      marketingCookies: boolean
      thirdPartyCookies: boolean
    }
  ): void {
    const consent: GDPRConsent = {
      id: `consent-${Date.now()}`,
      email,
      timestamp: new Date(),
      ...preferences,
      version: CONSENT_VERSION,
    }

    localStorage.setItem(`gdpr-consent-${email}`, JSON.stringify(consent))

    // Log compliance event
    this.logComplianceEvent('consent_recorded', {
      email,
      preferences,
    })
  }

  /**
   * Check if user has given consent for a specific category
   */
  static hasConsent(email: string, category: string): boolean {
    const consent = this.getConsent(email)
    if (!consent) return false

    switch (category) {
      case 'essential':
        return true // Always true
      case 'analytics':
        return consent.analyticsCookies
      case 'marketing':
        return consent.marketingCookies
      case 'thirdparty':
        return consent.thirdPartyCookies
      default:
        return false
    }
  }

  /**
   * Request data export (Right to Access)
   */
  static requestDataExport(email: string): DataExportRequest {
    const request: DataExportRequest = {
      id: `export-${Date.now()}`,
      email,
      requestDate: new Date(),
      status: 'pending',
      dataIncluded: [
        'profile_data',
        'transaction_history',
        'communication_logs',
        'preferences',
        'consent_records',
      ],
    }

    localStorage.setItem(
      `data-export-${email}`,
      JSON.stringify(request)
    )

    this.logComplianceEvent('data_export_requested', { email })

    return request
  }

  /**
   * Request account deletion (Right to be Forgotten)
   */
  static requestDeletion(email: string): DeletionRequest {
    const request: DeletionRequest = {
      id: `deletion-${Date.now()}`,
      email,
      requestDate: new Date(),
      status: 'pending',
    }

    localStorage.setItem(
      `deletion-request-${email}`,
      JSON.stringify(request)
    )

    this.logComplianceEvent('deletion_requested', { email })

    return request
  }

  /**
   * Withdraw consent at any time
   */
  static withdrawConsent(email: string): void {
    localStorage.removeItem(`gdpr-consent-${email}`)

    this.logComplianceEvent('consent_withdrawn', { email })
  }

  /**
   * Get all compliance requests for admin
   */
  static getAllRequests(): {
    dataExports: DataExportRequest[]
    deletions: DeletionRequest[]
  } {
    const dataExports: DataExportRequest[] = []
    const deletions: DeletionRequest[] = []

    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith('data-export-')) {
          const data = localStorage.getItem(key)
          if (data) dataExports.push(JSON.parse(data))
        }
        if (key?.startsWith('deletion-request-')) {
          const data = localStorage.getItem(key)
          if (data) deletions.push(JSON.parse(data))
        }
      }
    } catch (error) {
      console.error('Error retrieving compliance requests:', error)
    }

    return { dataExports, deletions }
  }

  /**
   * Log compliance event for audit trail
   */
  private static logComplianceEvent(
    eventName: string,
    data: any
  ): void {
    const auditEntry = {
      timestamp: new Date().toISOString(),
      event: eventName,
      data,
    }

    // Store in audit log
    const auditLog = localStorage.getItem('gdpr-audit-log')
    const logs = auditLog ? JSON.parse(auditLog) : []
    logs.push(auditEntry)

    localStorage.setItem('gdpr-audit-log', JSON.stringify(logs))

    // Log to analytics if applicable
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', `gdpr_${eventName}`, data)
    }
  }

  /**
   * Get audit log (admin only)
   */
  static getAuditLog(): any[] {
    try {
      const data = localStorage.getItem('gdpr-audit-log')
      return data ? JSON.parse(data) : []
    } catch (error) {
      return []
    }
  }

  /**
   * Privacy Policy Methods
   */
  static getPrivacyPolicyVersion(): string {
    return '2.0'
  }

  static getPrivacyPolicy(): string {
    return `
PRIVACY POLICY - AUREXIA CAPITAL

Effective Date: February 26, 2026

1. DATA COLLECTION
We collect data necessary for service provision:
- Contact information (name, email, phone)
- Financial information (investment preferences, portfolio data)
- Usage analytics (page visits, interaction patterns)
- Technical data (IP address, browser type)

2. DATA USAGE
Your data is used for:
- Service delivery and account management
- Regulatory compliance
- Performance analysis
- Service improvement
- Communication (with your consent)

3. YOUR RIGHTS (GDPR/CCPA)
- Right to access your data
- Right to correct inaccurate data
- Right to be forgotten (deletion)
- Right to data portability
- Right to withdraw consent
- Right to object to processing

4. DATA RETENTION
- Account data: Duration of relationship + 7 years (legal)
- Transaction data: 10 years (regulatory)
- Marketing data: Until unsubscribe
- Analytics data: 2 years

5. SECURITY
- AES-256 encryption for data at rest
- TLS 1.3 for data in transit
- Regular security audits
- Intrusion detection systems
- 24/7 monitoring

6. THIRD PARTIES
We do not sell personal data. We share data only with:
- Regulatory authorities (when required)
- Service providers under contract
- Legal advisors (when necessary)

7. COOKIES
We use cookies for:
- Essential: Session management
- Analytics: Usage patterns (with consent)
- Marketing: Targeted communications (with consent)

8. CONTACT
Data Protection Officer: privacy@aurexiacapital.com
Address: Pristina, Kosovo
Phone: +383 (0) 38 123 456
    `
  }

  /**
   * Terms of Service
   */
  static getTermsOfService(): string {
    return `
TERMS OF SERVICE - AUREXIA CAPITAL

Effective Date: February 26, 2026

1. ACCEPTANCE OF TERMS
By using this portal, you accept these terms.

2. USER OBLIGATIONS
- Maintain confidentiality of login credentials
- Use portal only for authorized purposes
- Comply with all applicable laws
- Do not attempt to access unauthorized data

3. SERVICE PROVISION
- Services provided "as is"
- We maintain system uptime and security
- Support available Mon-Fri 09:00-17:30 CET

4. LIMITATION OF LIABILITY
- Maximum liability: Amount of fees paid
- No liability for indirect damages
- No liability for user error

5. MODIFICATION
- We may modify terms with 30 days notice
- Continued use = acceptance of new terms

6. TERMINATION
- Either party may terminate with 30 days notice
- Immediate termination for breach
    `
  }
}

export default GDPRService
