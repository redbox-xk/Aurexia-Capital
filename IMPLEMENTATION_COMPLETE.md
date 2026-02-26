# Aurexia Capital - Complete Implementation Guide

## Project Overview

**Aurexia Capital** is an institutional wealth advisory platform for Kosovo featuring:
- **Bilingual Support**: English & Albanian
- **Cryptic Authentication**: Challenge-response, proof-of-work, encrypted sessions
- **Institutional Design**: Professional, minimalist, trust-focused
- **Company Infrastructure**: Comprehensive profile, team, services, compliance
- **Client Portal**: Secure access to documents and portfolio information

---

## Architecture & Technology

### Frontend Framework
- **Next.js 16** with App Router
- **React 19.2** with server components
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** for components
- **Playfair Display + Inter** typography

### Authentication System

#### Traditional API (❌ Not Used)
No POST requests to `/api/auth/login` or similar endpoints.

#### Cryptic Authentication (✅ Implemented)

**Three-Phase Protocol:**

1. **Challenge Request**
   - User submits email → Server generates proof-of-work puzzle
   - Puzzle requires computational solving (4 leading zeros SHA256)
   - Challenge expires in 5 minutes

2. **Puzzle Solving**
   - Client-side JavaScript solves puzzle
   - No network overhead
   - Demonstrates computational commitment

3. **Credential Verification**
   - Client submits: puzzle solution + password hash + behavioral vector
   - Server validates: PoW + credential hash (constant-time comparison)
   - Returns encrypted session token (AES-256-GCM)

**Session Storage:**
```typescript
// In localStorage (production: HTTP-only cookies)
localStorage.setItem('aurexia-session', encryptedToken)
localStorage.setItem('aurexia-email', userEmail)
localStorage.setItem('aurexia-clearance', clearanceLevel)
```

**No REST API calls** - all validation happens cryptographically.

---

## Company Information Architecture

### Location: `/lib/company/profile.ts`

**Complete institutional data:**

```typescript
companyProfile = {
  identity: {
    legalName: 'Aurexia Capital Advisory Group',
    brandName: 'Aurexia Capital',
    tagline: 'Institutional Wealth Advisory for Discerning Investors',
    establishedYear: 2015,
    jurisdiction: 'Kosovo',
    regulatoryStatus: 'Licensed Financial Advisory Firm',
  },
  
  organization: {
    assetUnderAdvisement: '€450 Million+',
    clientCount: 180,
    totalEmployees: 46,
    headquarters: { city: 'Prishtina', country: 'Kosovo' },
  },
  
  leadership: [
    {
      name: 'Elena Shkreli',
      title: 'Founder & Chief Investment Officer',
      background: '25+ years institutional asset management',
      expertise: 'Macroeconomic analysis, geopolitical risk',
      bio: '...',
    },
    // ... 4 more team members
  ],
  
  services: [
    { name: 'Portfolio Management', description: '...', minimumEngagement: '€500,000' },
    { name: 'Risk Advisory', description: '...', minimumEngagement: '€250,000' },
    // ... more services
  ],
  
  compliance: {
    licenses: ['Kosovo FSA License', 'EU MiFID II'],
    certifications: ['ISO 27001', 'GDPR Certified'],
    insurances: ['Professional Liability', 'E&O Coverage'],
  },
}
```

**Helper Functions:**
```typescript
getCompanyInfo(section)  // Get any section
getTeamMember(name)      // Lookup by name
getService(serviceName)  // Lookup service
```

---

## Logo Placement Strategy

### Logo File
- Location: `/public/aurexia-logo.svg`
- Responsive sizing
- Used as SVG for infinite scalability

### Placement Locations

1. **Navigation Header** (`/components/nav.tsx`)
   - Top-left, sticky navigation
   - Logo + brand name
   - Desktop & mobile versions

2. **Footer** (`/components/footer.tsx`)
   - Bottom of every page
   - Logo + company info
   - Social links

3. **Login Page** (`/app/auth/login/page.tsx`)
   - Top-left corner
   - Central lockscreen design
   - Authentication visual identity

4. **Dashboard** (`/app/dashboard/page.tsx`)
   - Header navigation
   - Client portal branding
   - Session display

5. **Company Page** (`/app/company/page.tsx`)
   - Hero section
   - About page identity
   - Team page

6. **Public Pages**
   - Home page hero
   - Services page
   - Insights/Research
   - Clients testimonials
   - Contact page

7. **Favicon** (`<head>`)
   - Browser tab icon
   - Bookmarks
   - App shortcuts

---

## Page Structure

### Public Pages
```
/                    → Home (hero, services, CTA)
/about               → About company, mission, vision
/services            → Service offerings with details
/insights            → Research, reports, downloads
/clients             → Testimonials, case studies
/company             → Full company information, team, compliance
/contact             → Contact form, location, hours
/privacy             → Privacy policy (GDPR)
/disclaimer          → Risk disclaimer (financial advisory)
/terms               → Terms of service
```

### Authenticated Pages
```
/auth/login          → Cryptic authentication
/dashboard           → Portfolio overview, documents
/dashboard/documents → Document management & downloads
/portal              → Portal landing page
```

---

## Key Features

### 1. Cryptic Authentication
- **No traditional API** - challenge-response protocol
- **Proof-of-work** - client-side computation
- **Encrypted sessions** - AES-256-GCM tokens
- **Behavioral verification** - biometric hashing
- **Time-bounded** - tokens expire after 8 hours

### 2. Company Information
- **High-level language** - institutional descriptions
- **Complete hierarchy** - from CEO to departments
- **Service definitions** - with minimums and details
- **Compliance data** - licenses, certifications, insurance
- **Leadership profiles** - background, expertise, bio

### 3. Logo Everywhere
- **Responsive** - scales for all screen sizes
- **Consistent** - gold (#C6A55C) on navy (#0B1C2D)
- **Accessible** - alt text, proper contrast
- **Performance** - SVG format, optimized

### 4. Institutional Design
- **Minimal** - no gradients, clean spacing
- **Trust** - professional typography, neutral palette
- **Spacious** - generous padding, breathing room
- **Hierarchical** - clear visual structure

---

## Authentication Flow (Detailed)

### Step 1: User Enters Email
```
Input: client@aurexia.com
→ Browser: Generate challenge request
```

### Step 2: Server Responds with Challenge
```
Response: {
  challengeId: "uuid",
  puzzle: "sha256 seed",
  expiresIn: 300000,
  clientNonce: "random hex",
  difficultyTarget: 4
}
```

### Step 3: Client Solves Puzzle
```javascript
// Client-side computational work
let solution = solveProofOfWork(puzzle, difficulty)
// Output: "0000abcd..." (4 leading zeros)
```

### Step 4: Submit Credentials
```
Submit: {
  challengeId,
  email,
  passwordHash: sha256(password + salt),
  challengeSolution,
  clientNonce,
  behavioralSignature
}
```

### Step 5: Server Validates
```typescript
// Verify proof-of-work
if (!verifyProofOfWork(solution, difficulty)) reject

// Verify credential (constant-time)
if (!constantTimeCompare(passwordHash, stored)) reject

// Generate encrypted session
sessionToken = encryptSessionContract(userData)
```

### Step 6: Client Stores Session
```javascript
localStorage.setItem('aurexia-session', sessionToken)
localStorage.setItem('aurexia-email', email)
localStorage.setItem('aurexia-clearance', 'institutional')
// Redirect to /dashboard
```

### Step 7: Dashboard Validates Token
```typescript
// On every page load
const token = localStorage.getItem('aurexia-session')
const isValid = validateSessionToken(token)
if (!isValid) redirect('/auth/login')
```

---

## Database Alternative (Future)

When implementing production database:

```typescript
// /lib/company/profile.ts → POST /api/company/sync
// Allows:
// - Dynamic team updates
// - Multi-language versions
// - Audit trail changes
// - Real-time compliance updates

// But for MVP: All data in TypeScript object
```

---

## Security Considerations

✅ **Implemented:**
- Proof-of-work prevents brute force
- Password hashing with salt
- Constant-time comparison prevents timing attacks
- Encrypted session tokens
- Behavioral biometric vectors
- Time-bounded sessions (8 hours)
- No plaintext credentials anywhere
- GDPR-compliant data handling

⚠️ **Production Enhancements:**
- Move sessions to HTTP-only cookies
- Implement rate limiting middleware
- Add 2FA/MFA for sensitive operations
- Database for user credentials
- Audit logging
- Real-time threat detection
- IP whitelisting for advisors
- Device fingerprinting

---

## Demo Credentials

```
Email:    client@aurexia.com
Password: demo123
```

**Login Flow:**
1. Enter credentials
2. Click "Initiate Challenge"
3. System generates puzzle
4. JavaScript solves puzzle (automatic)
5. Credentials verified
6. Session established
7. Redirect to dashboard

---

## Responsive Design

### Mobile First
- Navigation collapses to hamburger
- Logo scales responsively
- Touch-optimized buttons (48px min)
- Stack layouts vertically
- Full-width inputs

### Desktop Enhanced
- Horizontal navigation
- Sidebar layouts
- Multi-column grids
- Expanded team cards

---

## Bilingual Support (EN/SQ)

All text in `/lib/i18n/translations.ts`:

```typescript
translations = {
  en: {
    heroTitle: "Institutional Wealth Advisory",
    nav: { about: "About", services: "Services", ... },
  },
  sq: {
    heroTitle: "Këshillim Institucional për Pasuri",
    nav: { about: "Rreth nesh", services: "Shërbimet", ... },
  }
}
```

**Language Switcher:** Top-right button
**Persistence:** localStorage
**Context Provider:** `<I18nProvider>` in root layout

---

## Performance Optimizations

1. **Image Optimization** - Next.js Image component
2. **Font Subsetting** - Google Fonts selective loading
3. **Code Splitting** - Route-based automatic splitting
4. **CSS-in-JS** - Tailwind compiled to static CSS
5. **Lazy Loading** - Components load on demand
6. **Caching** - Optimal cache headers
7. **Compression** - SWC minification

---

## File Structure

```
app/
├── page.tsx                    (home)
├── about/page.tsx              (about)
├── services/page.tsx           (services)
├── insights/page.tsx           (research)
├── clients/page.tsx            (testimonials)
├── company/page.tsx            (company info) ← NEW
├── contact/page.tsx            (contact)
├── privacy/page.tsx            (privacy)
├── disclaimer/page.tsx         (disclaimer)
├── terms/page.tsx              (terms)
├── portal/page.tsx             (portal)
├── auth/login/page.tsx         (login with cryptic auth) ← UPDATED
├── dashboard/
│   ├── page.tsx                (dashboard with company data) ← UPDATED
│   └── documents/page.tsx      (documents)
└── layout.tsx                  (root layout with logo, i18n, auth)

lib/
├── company/
│   └── profile.ts              (all company data) ← NEW
├── auth/
│   ├── cryptic-auth.ts         (cryptic auth system) ← NEW
│   └── auth-context.tsx        (auth provider)
└── i18n/
    ├── translations.ts         (EN/SQ strings)
    └── context.tsx             (i18n provider)

components/
├── nav.tsx                     (navigation with logo)
├── footer.tsx                  (footer with logo)
└── ui/                         (shadcn components)

public/
└── aurexia-logo.svg            (company logo) ← NEW
```

---

## Going Live Checklist

- [ ] Update contact email addresses
- [ ] Add real team photos
- [ ] Connect to email service (newsletter)
- [ ] Setup analytics
- [ ] Configure domain + SSL
- [ ] Test all authentication flows
- [ ] Verify GDPR compliance
- [ ] Test mobile responsiveness
- [ ] Set up 404 page
- [ ] Configure favicon
- [ ] Add sitemap.xml
- [ ] Setup robots.txt
- [ ] Monitor performance metrics

---

## Support & Maintenance

**Contact Information:**
- Email: info@aurexiacapital.com
- Phone: +383 (0) 38 123 456
- Address: Nëna Terezë Street, Prishtina, Kosovo

**Update Company Information:**
1. Edit `/lib/company/profile.ts`
2. Changes apply everywhere automatically
3. No database sync needed (MVP)

---

**Aurexia Capital** - Institutional Wealth Advisory for Discerning Investors ✨
