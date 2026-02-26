# Aurexia Capital - Institutional Wealth Advisory Platform

A professional institutional-grade financial advisory website for Kosovo-based wealth management firm, built with **bilingual support (English & Albanian)**, secure client portal, document management, and GDPR compliance.

## Features

### Public Website
- **Bilingual Interface**: English (EN) & Albanian (SQ) support with language switcher
- **Professional Design**: Clean, institutional aesthetic with dark/neutral palette
- **Responsive Layout**: Mobile-first design, fully responsive across all devices
- **SEO Optimized**: Structured metadata, Open Graph tags, social media integration

### Pages
- **Home**: Hero section, value propositions, service overview, CTA
- **About**: Mission, vision, governance, team section
- **Services**: Portfolio management, risk advisory, tax strategy, succession planning
- **Research & Insights**: Quarterly reports, market analysis, PDF downloads
- **Clients**: Testimonials, institutional trust indicators, service highlights
- **Contact**: Secure form, contact info, GDPR-compliant messaging
- **Legal**: Privacy policy, risk disclaimer, terms of service

### Client Portal
- **Secure Authentication**: Email/password login with demo credentials
- **Dashboard**: Portfolio overview, performance metrics, quick stats
- **Document Management**: Browse, filter, and download confidential documents
- **Advisor Communication**: Contact information, messaging interface
- **Account Settings**: Security, privacy, profile management

### Advanced Features
- **Newsletter System**: GDPR-compliant email subscription with consent tracking
- **Analytics**: Session tracking, event logging, user behavior analysis
- **GDPR Compliance**: 
  - Cookie consent banner
  - Privacy-first data collection
  - Unsubscribe mechanisms
  - Data export capabilities
- **Document Downloads**: Secure PDF management with file size tracking
- **Multi-language Support**: Full i18n implementation with persistent language selection

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Components**: shadcn/ui with Tailwind CSS
- **Styling**: Tailwind CSS with semantic design tokens
- **Typography**: Playfair Display (headings) + Inter (body)
- **Internationalization**: Custom i18n context (EN/SQ)
- **Authentication**: Custom JWT-based session management
- **State Management**: React Context API
- **Icons**: Lucide React

## Project Structure

```
app/
├── layout.tsx                 # Root layout with providers
├── globals.css               # Global styles & design tokens
├── page.tsx                  # Home page
├── about/page.tsx            # About page
├── services/page.tsx         # Services page
├── insights/page.tsx         # Research & insights
├── clients/page.tsx          # Testimonials & clients
├── contact/page.tsx          # Contact form
├── privacy/page.tsx          # Privacy policy
├── disclaimer/page.tsx       # Risk disclaimer
├── terms/page.tsx            # Terms of service
├── portal/page.tsx           # Portal landing
├── auth/
│   └── login/page.tsx        # Client login
├── dashboard/
│   ├── page.tsx              # Main dashboard
│   └── documents/page.tsx    # Documents & research
└── api/
    ├── documents/[id]/download/route.ts
    └── newsletter/subscribe/route.ts

lib/
├── i18n/
│   ├── translations.ts       # All translation strings
│   └── context.tsx           # i18n provider & hooks
├── auth/
│   └── auth-context.tsx      # Authentication context
├── documents/
│   └── index.ts              # Document management service
├── newsletter/
│   └── index.ts              # Newsletter subscription service
└── analytics/
    └── index.ts              # Analytics & GDPR tracking

components/
├── nav.tsx                   # Navigation with language switcher
├── footer.tsx                # Footer with links
├── gdpr-banner.tsx           # GDPR consent banner
└── ui/                       # shadcn/ui components
```

## Demo Credentials

To test the client portal:
- **Email**: `client@aurexia.com`
- **Password**: `demo123`

## Getting Started

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Run development server**:
   ```bash
   pnpm dev
   ```

3. **Open browser**:
   Navigate to `http://localhost:3000`

## Deployment

Deploy to Vercel with one click:

```bash
vercel deploy
```

Set environment variables in Vercel dashboard if needed (currently uses mock data for demos).

## Key Features Explained

### Bilingual Support
- Language persists in localStorage
- All UI strings in `lib/i18n/translations.ts`
- Use `useI18n()` hook to access translations

### Authentication
- Custom auth context with mock credentials
- Tokens stored in localStorage (production should use HTTP-only cookies)
- Protected dashboard routes with redirect to login

### Document Management
- Browse documents by category (report, strategy, research, compliance)
- Search functionality across titles, descriptions, tags
- File size and upload date tracking
- Mock download API (integrate with S3, Vercel Blob, etc.)

### GDPR Compliance
- Cookie consent banner with granular controls
- Privacy policy linked throughout
- Analytics disabled by default, enabled only with consent
- Data export and deletion mechanisms

## Customization

### Update Branding
1. Change logo in `/public/` directory
2. Update company name in `lib/i18n/translations.ts`
3. Modify colors in `app/globals.css` (design tokens)

### Add Documents
Edit `lib/documents/index.ts` and add entries to `mockDocuments` array.

### Connect Real Backend
Replace mock implementations in:
- `/lib/auth/auth-context.tsx` - Connect to real auth service
- `/lib/documents/index.ts` - Fetch from database
- `/lib/newsletter/index.ts` - Connect to email service

## Performance Optimizations

- Image optimization with Next.js Image component
- Font subsetting with Google Fonts
- CSS-in-JS with Tailwind (compiled to static CSS)
- Semantic HTML for accessibility
- Mobile-optimized navigation and responsive design

## Compliance & Security

- GDPR-compliant data collection
- Privacy policy included
- Terms of service covering liability
- Risk disclaimer for financial advisory
- No hardcoded sensitive data

## Future Enhancements

1. **Backend Integration**:
   - Connect to real authentication service
   - Implement database (PostgreSQL, etc.)
   - Real document storage (S3, Vercel Blob)

2. **Email Integration**:
   - Sendgrid/Resend for newsletter
   - Automated confirmation emails
   - Newsletter campaign tracking

3. **Analytics**:
   - Vercel Analytics
   - Google Analytics 4
   - Custom event tracking

4. **Admin CMS**:
   - Manage documents and research
   - Update news and insights
   - Client management interface

## Support

For questions or issues:
- Contact: info@aurexiacapital.com
- Phone: +383 (0) 38 123 456
- Location: Prishtina, Kosovo

---

**Aurexia Capital** - Institutional Wealth Advisory for Discerning Clients
