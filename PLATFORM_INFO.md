# Flash Wallet - Premium Digital Asset Management Platform

## Platform Overview

Flash Wallet is a high-performance, emotionally-designed cryptocurrency wallet platform built on Next.js 16 with Supabase. It provides users with complete control, security, and peace of mind for managing their digital assets.

## Core Philosophy

**"Peace of Mind for Your Digital Life"**

Every interaction is designed with emotional trust and simplicity in mind. The platform emphasizes:
- **Complete Control**: Users own their assets, fully and completely
- **Lightning Speed**: Instant transactions without complications
- **Unbreakable Security**: Military-grade encryption and protection
- **Beautiful Simplicity**: Intuitive design that makes complex finance simple

## Technical Architecture

### Frontend Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: SWR for client-side data fetching

### Backend Stack
- **Database**: Supabase (PostgreSQL with RLS)
- **Authentication**: Supabase Auth (Email/Password)
- **API**: Next.js Route Handlers + Server Actions
- **Session Management**: HTTP-only cookies via middleware

### Design System

#### Color Palette (Soft, Eye-Loving)
- **Primary**: Golden/Amber (`42 95% 57%`) - Trust & Optimism
- **Secondary**: Soft Blue (`200 70% 65%`) - Calm & Security
- **Background**: Off-white (`0 0% 98%`) - Clean & Light
- **Foreground**: Deep Charcoal (`220 13% 20%`) - Readable & Warm
- **Muted**: Soft Gray (`0 0% 92%`) - Subtle & Gentle

#### Typography
- **Headings**: Bold weights (600-700) for impact
- **Body**: Light (300-400) weights for readability and elegance
- **Accent**: Semibold for CTA and important elements

### Database Schema

#### Tables
1. **profiles** - User profile information (linked to auth.users)
2. **wallets** - Multi-wallet support per user with metadata
3. **transactions** - Complete transaction history with type tracking
4. **contacts** - Saved recipient addresses for easy access

#### Row Level Security (RLS)
All tables have RLS enabled to ensure users can only access their own data.

## Feature Set

### Authentication
- Email/Password signup with confirmation flow
- Secure session management
- Protected routes via middleware
- Profile auto-creation on signup

### Dashboard
- Total balance overview
- Multi-wallet management
- Quick transaction stats
- Recent activity feed
- Performance indicators

### Wallet Management
- Create unlimited wallets
- Set primary wallet for quick access
- View individual wallet balances
- Delete unused wallets
- Real-time balance updates

### Transactions
- Send funds with address validation
- Receive funds with shareable QR codes
- Complete transaction history with filtering
- Transaction status tracking
- Export transaction data

### Profile
- User settings management
- Wallet preferences
- Security settings
- Account management

## Performance Optimizations

1. **React Compiler**: Enabled for automatic optimization
2. **Image Optimization**: Next.js Image with AVIF/WebP
3. **Code Splitting**: Automatic route-based splitting
4. **Compression**: SWC minification enabled
5. **Caching**: Strategic use of Next.js cache directives
6. **SWR**: Client-side data fetching with revalidation
7. **Database Indexing**: Optimized RLS policies for fast queries

## Security Features

1. **End-to-End**: All communications over HTTPS
2. **Authentication**: Supabase Auth with email verification
3. **Session Management**: HTTP-only cookies with secure middleware
4. **Row Level Security**: Database-level access control
5. **Input Validation**: Client and server-side validation
6. **CSRF Protection**: Built into Next.js
7. **Rate Limiting**: Recommended via Vercel middleware

## User Experience Design

### Emotional Messaging
All copy emphasizes:
- **Trust**: "Unbreakable Security", "Military-grade encryption"
- **Freedom**: "Complete control", "Financial freedom"
- **Simplicity**: "Lightning speed", "Beautifully simple"
- **Peace of Mind**: "Your assets sleep peacefully"

### Visual Design
- Soft, warm color palette that's easy on the eyes
- Ample whitespace for breathing room
- Smooth transitions and hover effects
- Clear visual hierarchy
- Responsive design (mobile-first)

## Deployment

### Prerequisites
1. Vercel account
2. Supabase project
3. Environment variables configured

### Environment Variables Required
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL`

### Deployment Steps
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy from main branch
4. Run database migrations in Supabase
5. Test authentication flow

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Sign in user
- `POST /api/auth/logout` - Sign out user

### Wallets
- `GET /api/wallets` - List user's wallets
- `POST /api/wallets` - Create new wallet
- `PUT /api/wallets/[id]` - Update wallet
- `DELETE /api/wallets/[id]` - Delete wallet

### Transactions
- `GET /api/transactions` - List transactions
- `POST /api/transactions/send` - Send funds
- `POST /api/transactions/receive` - Record received funds
- `GET /api/transactions/[id]` - Get transaction details

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

## Future Enhancements

1. Multi-chain support (Bitcoin, Ethereum, etc.)
2. Trading capabilities
3. Advanced analytics
4. Biometric authentication
5. Hardware wallet integration
6. Mobile app (React Native)
7. Dark mode with system preference detection
8. Multi-currency display
9. Transaction scheduling
10. Automated backup features

## Support & Documentation

For detailed implementation guides, see:
- `/docs/setup.md` - Installation and setup
- `/docs/api.md` - API documentation
- `/docs/security.md` - Security best practices
- `/docs/contributing.md` - Contributing guidelines

## License

Flash Wallet © 2024. All rights reserved.
