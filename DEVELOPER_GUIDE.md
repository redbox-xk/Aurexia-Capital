# Flash Wallet - Developer Guide

## High-Level Architecture & Engineering Excellence

This guide explains how Flash Wallet is engineered for **lightweight performance**, **lightning-speed** interactions, and **emotional design** that builds trust.

---

## 🎯 Core Engineering Principles

### 1. Lightweight & Performant
- **Minimal JavaScript**: Only ship what's needed
- **Server Components**: Use Next.js 16 React Server Components by default
- **Code Splitting**: Automatic route-based splitting
- **React Compiler**: Automatic optimization at build time
- **Streaming**: Progressive loading for better UX

### 2. Lightning Speed
- **Sub-second Page Loads**: Target < 1s Time to Interactive
- **Instant Interactions**: < 100ms response time
- **Database Optimization**: Indexed queries, efficient RLS
- **Edge Caching**: Vercel CDN for global distribution
- **Compression**: Automatic GZIP + Brotli

### 3. Emotional Design
- **Soft Color Palette**: Easy on eyes, builds trust
- **Meaningful Copy**: Every word builds confidence
- **Smooth Interactions**: 300ms transitions for comfort
- **Visual Hierarchy**: Clear focus and direction
- **Responsive by Default**: Beautiful on all devices

---

## 📊 Project Structure & Philosophy

```
flash-wallet/
│
├── app/                     # Next.js App Router (Server-first)
│   ├── auth/               # Authentication flow
│   ├── dashboard/          # Protected routes
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Landing page (RSC)
│   └── globals.css         # Design tokens & theme
│
├── components/             # React Components (mix of RSC & client)
│   ├── dashboard/          # Dashboard-specific components
│   │   ├── nav.tsx         # Navigation (client)
│   │   ├── overview.tsx    # Overview (async RSC)
│   │   ├── wallets-manager.tsx  # Wallet management
│   │   └── ...
│   ├── ui/                 # shadcn/ui primitives (client)
│   └── logo.tsx            # Logo component
│
├── lib/                    # Utilities & Helpers (shared)
│   ├── supabase/          # Supabase client setup
│   │   ├── client.ts      # Browser client
│   │   ├── server.ts      # Server client
│   │   └── proxy.ts       # Middleware proxy
│   ├── types.ts           # TypeScript types
│   ├── wallet-utils.ts    # Helper functions
│   └── utils.ts           # General utilities
│
├── middleware.ts           # Next.js middleware (session handling)
├── next.config.mjs        # Build optimizations
├── tailwind.config.ts     # Tailwind configuration
│
└── scripts/               # Database migrations
```

---

## 🚀 Development Workflow

### Starting Development

```bash
# Install dependencies
npm install

# Create .env.local
cp .env.local.example .env.local

# Add Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

# Run development server
npm run dev

# Open http://localhost:3000
```

### Key npm Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
npm run format       # Format with Prettier
```

---

## 🏗️ High-Level Technology Decisions

### Why Next.js 16?

- **React Server Components**: Reduce JavaScript bundle
- **Automatic Code Splitting**: Better performance
- **Built-in Middleware**: Session handling without extra library
- **API Routes + Server Actions**: Simple backend operations
- **React Compiler**: Automatic optimization at build time
- **Edge Runtime**: Vercel integration for global performance

### Why Supabase?

- **PostgreSQL Power**: Relational database with advanced features
- **Row Level Security**: Database-level access control
- **Authentication Built-in**: No need for separate auth service
- **Real-time Subscriptions**: Live data updates
- **Serverless**: No server infrastructure to manage
- **Developer Friendly**: SQL + SDK simplicity

### Why Tailwind CSS?

- **Utility-First**: Fast styling without context switching
- **Design Tokens**: Semantic color system
- **Responsive by Default**: Mobile-first approach
- **Performance**: Only ships used CSS
- **Dark Mode**: Built-in theme support

### Why shadcn/ui?

- **Unstyled Primitives**: Full customization
- **Copy-Paste**: Own the component code
- **Accessible**: Built on Radix UI
- **TypeScript**: Full type safety
- **No Dependencies**: Reduce bundle

---

## 🔄 Data Flow Architecture

### Server-Rendered Pages (RSCs)

```typescript
// app/dashboard/page.tsx
export default async function DashboardPage() {
  const supabase = createClient()
  
  // Server-side data fetching
  const { data: wallets } = await supabase
    .from('wallets')
    .select('*')
  
  // Pass to client component
  return <DashboardOverview wallets={wallets} />
}
```

**Benefits:**
- Data fetched on server (no API round-trip)
- Sensitive operations on server
- Smaller JavaScript bundle
- Better SEO (content in HTML)

### Client Components (Interactivity)

```typescript
// components/dashboard/wallets-manager.tsx
'use client'

export function WalletsManager({ wallets }: Props) {
  const [list, setList] = useState(wallets)
  
  // Client-side interactivity
  const handleCreate = async () => {
    const response = await fetch('/api/wallets', {
      method: 'POST',
      body: JSON.stringify({ name })
    })
    // Update UI
  }
  
  return <div>...</div>
}
```

**Benefits:**
- Smooth interactions
- Real-time updates
- Local state management
- Event handlers

### Server Actions (Safe Backend)

```typescript
// app/dashboard/actions.ts
'use server'

export async function createWallet(name: string) {
  // Safe server operation
  const supabase = createClient()
  
  // Direct database access
  const { data } = await supabase
    .from('wallets')
    .insert({ name, user_id: userId })
  
  return data
}
```

**Benefits:**
- Type-safe backend calls
- No API routes needed
- Server-only code (security)
- Automatic form validation

---

## 💾 Database Design Philosophy

### Single Responsibility

Each table has one clear purpose:

```sql
-- Users table (managed by Supabase Auth)
CREATE TABLE auth.users (
  id uuid PRIMARY KEY,
  email text UNIQUE,
  password_hash text,
  ...
)

-- Profiles: User metadata
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  first_name text,
  last_name text,
  created_at timestamp
)

-- Wallets: User's wallet containers
CREATE TABLE wallets (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES profiles(id),
  name text,
  address text,
  is_primary boolean,
  balance numeric
)

-- Transactions: Activity history
CREATE TABLE transactions (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES profiles(id),
  wallet_id uuid REFERENCES wallets(id),
  type text, -- 'send' or 'receive'
  amount numeric,
  fee numeric,
  recipient text,
  status text
)

-- Contacts: Saved addresses
CREATE TABLE contacts (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES profiles(id),
  name text,
  address text
)
```

### Row Level Security (RLS)

All tables have RLS enabled:

```sql
-- Users can only see their wallets
CREATE POLICY "users_own_wallets"
  ON wallets
  FOR SELECT
  USING (auth.uid() = user_id)

-- Users can only insert their wallets
CREATE POLICY "users_create_wallets"
  ON wallets
  FOR INSERT
  WITH CHECK (auth.uid() = user_id)
```

---

## 🎨 Design System Implementation

### Color Tokens

```css
/* app/globals.css */
:root {
  --primary: 42 95% 57%;        /* Golden Amber */
  --secondary: 200 70% 65%;     /* Soft Blue */
  --background: 0 0% 98%;       /* Off-white */
  --foreground: 220 13% 20%;    /* Deep Charcoal */
  --muted: 0 0% 92%;            /* Soft Gray */
}
```

### Tailwind Usage

```tsx
// components/dashboard/overview.tsx
<Card className="bg-gradient-to-br from-primary/5 to-transparent 
                 border-border/50 hover:border-primary/30 
                 transition-all duration-300">
  <CardContent className="p-8">
    <h2 className="text-4xl font-bold text-foreground">
      Your Wealth
    </h2>
  </CardContent>
</Card>
```

**Key Patterns:**
- Use HSL colors from tokens
- Semantic color names: `primary`, `muted`, `destructive`
- Responsive prefixes: `md:`, `lg:`
- Transition utilities: `duration-300`, `ease-in-out`

---

## ⚡ Performance Optimization Checklist

### Build Time
- ✅ React Compiler enabled
- ✅ SWC minification active
- ✅ Code splitting automatic
- ✅ Tree-shaking enabled

### Runtime
- ✅ Server Components default
- ✅ Client Components tagged `'use client'`
- ✅ Image optimization enabled
- ✅ Compression headers set

### Network
- ✅ CDN distribution
- ✅ Gzip + Brotli compression
- ✅ Cache headers optimized
- ✅ Bundle size monitored

### Database
- ✅ Indexes on foreign keys
- ✅ RLS policies efficient
- ✅ Queries optimized
- ✅ Connection pooling enabled

---

## 🔐 Security Best Practices

### Authentication Flow

```
User Signup
  ↓
Email Verification
  ↓
Email Confirmed
  ↓
Session Created (HTTP-only cookie)
  ↓
Redirect to Dashboard
```

### Request Flow

```
Request
  ↓
Middleware (check session)
  ↓
Route Handler / Server Action
  ↓
Supabase Auth Check
  ↓
RLS Policy Enforcement
  ↓
Database Operation
```

### Input Validation

```typescript
// Always validate on server
'use server'

export async function sendFunds(
  amount: number,
  recipient: string
) {
  // 1. Validate amount
  if (amount <= 0) throw new Error('Invalid amount')
  
  // 2. Validate recipient
  if (!isValidAddress(recipient)) throw new Error('Invalid address')
  
  // 3. Check balance
  const wallet = await getWallet()
  if (wallet.balance < amount) throw new Error('Insufficient funds')
  
  // 4. Execute transaction
  return await createTransaction(amount, recipient)
}
```

---

## 📈 Monitoring & Debugging

### Debug Logging

```typescript
// Use console.log with [v0] prefix for debugging
console.log('[v0] User data received:', userData)
console.log('[v0] API call starting with params:', params)
console.log('[v0] Error occurred:', error.message)
```

### Vercel Observability

- **Performance**: Vercel Analytics
- **Errors**: Sentry integration (optional)
- **Database**: Supabase dashboard
- **Logs**: Vercel logs in dashboard

---

## 🚀 Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] RLS policies active
- [ ] Email verification working
- [ ] Session management tested
- [ ] Error pages customized
- [ ] Analytics enabled
- [ ] Security headers set
- [ ] Robots.txt configured
- [ ] Sitemap generated

---

## 📚 Key Files Reference

| File | Purpose | Type |
|------|---------|------|
| `app/layout.tsx` | Root layout, metadata | RSC |
| `app/page.tsx` | Landing page | RSC |
| `app/auth/login/page.tsx` | Login form | Client |
| `app/dashboard/page.tsx` | Dashboard page | RSC |
| `middleware.ts` | Session checking | Middleware |
| `lib/supabase/client.ts` | Browser client | Utility |
| `lib/supabase/server.ts` | Server client | Utility |
| `components/dashboard/nav.tsx` | Navigation | Client |
| `components/dashboard/overview.tsx` | Dashboard overview | Mixed |

---

## 🔗 Quick Links

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.io/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

---

## 🎓 Learning Resources

1. **React Server Components**: [Official Guide](https://react.dev/reference/rsc/server-components)
2. **Next.js Middleware**: [Authentication Pattern](https://nextjs.org/docs/app/building-your-application/routing/middleware)
3. **Supabase RLS**: [Security Best Practices](https://supabase.com/docs/guides/auth/row-level-security)
4. **Performance**: [Web.dev Performance](https://web.dev/performance)

---

**Happy Coding! Build with confidence. 🚀**
