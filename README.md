# Flash Wallet 🚀

**Peace of Mind for Your Digital Life**

Flash Wallet is a premium, high-performance cryptocurrency wallet platform designed with emotional trust and beautiful simplicity at its core. Built on Next.js 16 and Supabase, it delivers lightning-fast transactions, unbreakable security, and complete control over your digital assets.

![Flash Wallet](public/logo.svg)

---

## 🌟 Features

### Core Capabilities
- ✨ **Multi-Wallet Support** - Create unlimited wallets for different purposes
- ⚡ **Lightning Speed** - Instant transactions without delays
- 🔒 **Military-Grade Security** - Bank-level encryption and protection
- 📱 **Responsive Design** - Works beautifully on mobile, tablet, and desktop
- 🌙 **Dark Mode** - Eye-loving interface in light and dark themes
- 📊 **Transaction History** - Complete tracking of all your activities
- 💾 **Export Data** - Download transactions for records and taxes

### User Experience
- 🎨 **Soft, Warm Colors** - Designed for comfort and trust
- 📝 **Intuitive Interface** - Beautiful simplicity that just works
- 🔔 **Smart Notifications** - Stay informed without overwhelming
- 💬 **Emotional Messaging** - Copy that builds confidence and trust
- 🚀 **Performance First** - Sub-second page loads and instant interactions

### Security
- 🛡️ **End-to-End Encryption** - All communications secure
- ✅ **Email Verification** - Confirm you own your account
- 🔐 **Row Level Security** - Database-level access control
- 🚪 **Session Management** - Secure HTTP-only cookies
- 📋 **CSRF Protection** - Built-in security measures

---

## 🏗️ Architecture

### Technology Stack

**Frontend**
```
Next.js 16 + React 19.2
├── TypeScript for type safety
├── Tailwind CSS for styling
├── shadcn/ui for components
├── Lucide React for icons
└── SWR for data fetching
```

**Backend**
```
Supabase (PostgreSQL)
├── Authentication with email/password
├── Row Level Security for access control
├── Real-time updates
└── Serverless functions
```

**Infrastructure**
```
Vercel
├── Automatic deployments
├── Global CDN
├── Performance optimization
└── SSL/TLS certificates
```

### High-Level Flow

```
User Interface (Next.js Components)
          ↓
      Client State (SWR)
          ↓
    API Route Handlers
          ↓
    Server Actions
          ↓
    Supabase Client
          ↓
    PostgreSQL + RLS
```

### Database Schema

```sql
-- Users (managed by Supabase Auth)
auth.users (email, password_hash, ...)

-- Application Tables
profiles (id, first_name, last_name, created_at)
wallets (id, user_id, name, address, is_primary, balance)
transactions (id, user_id, wallet_id, type, amount, fee, recipient, status)
contacts (id, user_id, name, address, memo)
```

### Performance Optimizations

1. **React Compiler** - Automatic component optimization
2. **Code Splitting** - Automatic route-based splitting
3. **Image Optimization** - AVIF/WebP formats
4. **Compression** - SWC minification
5. **Caching Strategy** - Optimized cache headers
6. **Database Indexing** - Fast RLS queries
7. **Lazy Loading** - Components load on demand

---

## 🎨 Design System

### Color Palette

```css
Primary:        hsl(42, 95%, 57%)    /* Golden Amber - Trust */
Secondary:      hsl(200, 70%, 65%)   /* Soft Blue - Security */
Background:     hsl(0, 0%, 98%)      /* Off-white - Clean */
Foreground:     hsl(220, 13%, 20%)   /* Deep Charcoal - Warm */
Muted:          hsl(0, 0%, 92%)      /* Soft Gray - Subtle */
```

### Typography

- **Headings**: Bold (600-700 weight) for impact
- **Body**: Light (300-400 weight) for elegance
- **Accent**: Semibold for CTAs and emphasis

### Spacing & Radius

- **Spacing**: 4px base unit (4, 8, 12, 16, 24, 32...)
- **Radius**: 1rem (16px) default for soft appearance

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Vercel account
- Supabase project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/flash-wallet.git
   cd flash-wallet
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open http://localhost:3000**

### Database Setup

1. Create Supabase project
2. Run migration script:
   ```bash
   npm run db:migrate
   ```
3. Set up RLS policies
4. Test authentication flow

---

## 📚 Project Structure

```
flash-wallet/
├── app/                        # Next.js App Router
│   ├── auth/                  # Authentication pages
│   ├── dashboard/             # Protected dashboard
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Landing page
│   └── globals.css            # Global styles
├── components/                # Reusable components
│   ├── dashboard/             # Dashboard components
│   ├── ui/                    # shadcn/ui components
│   └── logo.tsx               # Logo component
├── lib/                       # Utilities & helpers
│   ├── supabase/             # Supabase clients
│   ├── types.ts              # TypeScript types
│   └── wallet-utils.ts       # Utility functions
├── middleware.ts              # Authentication middleware
├── scripts/                   # Database migrations
├── public/                    # Static assets
└── next.config.mjs            # Next.js configuration
```

---

## 🔒 Security

### Built-in Protections

- **Input Validation**: Server-side validation on all inputs
- **SQL Injection Prevention**: Parameterized queries via Supabase
- **CSRF Protection**: Automatic CSRF tokens
- **XSS Prevention**: React's built-in sanitization
- **Rate Limiting**: Vercel middleware support
- **HTTPS Only**: All connections encrypted
- **Secure Headers**: Content-Security-Policy, X-Frame-Options, etc.

### User Data Protection

- **Row Level Security**: Each user can only access their data
- **Email Verification**: Confirm account ownership
- **Password Hashing**: bcrypt with salt
- **Session Security**: HTTP-only cookies
- **Data Isolation**: Complete user data separation

---

## 📈 Performance Metrics

- **Page Load**: < 1 second (target)
- **Interaction to Paint**: < 100ms
- **First Contentful Paint**: < 0.8s
- **Lighthouse Score**: 95+

---

## 🧪 Testing

### Run Tests
```bash
npm run test
```

### Coverage Report
```bash
npm run test:coverage
```

---

## 🚢 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to vercel.com
   - Click "New Project"
   - Import repository
   - Add environment variables
   - Deploy!

### Environment Variables for Production

```
NEXT_PUBLIC_SUPABASE_URL=prod_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=prod_key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=https://yourdomain.com
```

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Make changes and commit: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request

---

## 📞 Support

- **Documentation**: See [PLATFORM_INFO.md](PLATFORM_INFO.md)
- **User Guide**: See [WALLET_GUIDE.md](WALLET_GUIDE.md)
- **Issues**: Create on GitHub
- **Email**: support@flashwallet.app

---

## 📋 Roadmap

- [ ] Multi-chain support (Bitcoin, Ethereum, etc.)
- [ ] Trading capabilities
- [ ] Advanced analytics dashboard
- [ ] Biometric authentication
- [ ] Hardware wallet integration
- [ ] Mobile app (React Native)
- [ ] Dark mode with system preference
- [ ] Transaction scheduling
- [ ] Automated backup features
- [ ] Social features

---

## 📄 License

Flash Wallet © 2024. All rights reserved.

---

## 🙏 Acknowledgments

Built with ❤️ using:
- Next.js team
- Supabase community
- shadcn/ui
- Vercel
- Open source community

---

**Your financial freedom starts here. Welcome to Flash Wallet.** 🏠
