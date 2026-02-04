# Flash Wallet - Quick Reference Card

## 🚀 Quick Start

```bash
# Install & Setup
npm install
cp .env.local.example .env.local
# Edit .env.local with Supabase credentials

# Development
npm run dev
# Visit http://localhost:3000

# Build
npm run build

# Deploy
# Push to GitHub → Import in Vercel → Deploy
```

---

## 🎨 Design Tokens

```css
Primary:     HSL(42, 95%, 57%)   /* Golden Amber */
Secondary:   HSL(200, 70%, 65%)  /* Soft Blue */
Background:  HSL(0, 0%, 98%)     /* Off-white */
Foreground:  HSL(220, 13%, 20%)  /* Deep Charcoal */
Muted:       HSL(0, 0%, 92%)     /* Soft Gray */
Radius:      1rem (16px)
```

---

## 📁 Key Directories

```
app/              # Pages and routes
components/       # React components
lib/              # Utilities and helpers
public/           # Static assets
scripts/          # Database migrations
```

---

## 🔄 Adding a New Feature

### 1. Create Database Table (if needed)
```sql
CREATE TABLE new_table (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  created_at timestamp DEFAULT now()
);

ALTER TABLE new_table ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_own_records"
  ON new_table
  FOR SELECT
  USING (auth.uid() = user_id);
```

### 2. Create Page Component
```typescript
// app/new-feature/page.tsx
export default async function NewFeaturePage() {
  const supabase = createClient()
  const { data } = await supabase
    .from('new_table')
    .select('*')
  
  return <NewFeatureComponent data={data} />
}
```

### 3. Create UI Component
```typescript
// components/new-feature.tsx
'use client'

export function NewFeatureComponent({ data }: Props) {
  return <div>{/* Your UI */}</div>
}
```

### 4. Add Navigation Link
```typescript
// components/dashboard/nav.tsx
const navItems = [
  // ... existing items
  { href: "/new-feature", label: "New Feature", icon: IconName },
]
```

---

## 🗄️ Database Quick Reference

### Query Examples

```typescript
// Create
const { data } = await supabase
  .from('wallets')
  .insert({ name: 'My Wallet', user_id: userId })

// Read
const { data } = await supabase
  .from('wallets')
  .select('*')

// Update
const { data } = await supabase
  .from('wallets')
  .update({ name: 'Updated' })
  .eq('id', walletId)

// Delete
const { data } = await supabase
  .from('wallets')
  .delete()
  .eq('id', walletId)
```

---

## 🎯 Common Tasks

### Change Primary Color
```css
/* app/globals.css */
--primary: 42 95% 57%;  /* Change this HSL value */
```

### Add New Page
1. Create `app/new-page/page.tsx`
2. Add to navigation
3. Create corresponding component

### Update Logo
1. Replace `/public/logo.svg`
2. Update `components/logo.tsx` sizing if needed

### Add API Endpoint
```typescript
// app/api/endpoint/route.ts
export async function POST(request: Request) {
  const data = await request.json()
  // Process request
  return Response.json({ success: true })
}
```

---

## 🔐 Security Checklist

- ✅ All queries use RLS policies
- ✅ Sensitive operations on server (Server Actions)
- ✅ Input validated on server
- ✅ No secrets in client code
- ✅ HTTPS only (automatic on Vercel)
- ✅ Session checked via middleware

---

## 📦 Dependencies

Key packages used:

```json
{
  "next": "^16.0.0",
  "react": "^19.2.0",
  "typescript": "^5.x",
  "@supabase/supabase-js": "^2.x",
  "tailwindcss": "^4.x",
  "lucide-react": "^latest"
}
```

---

## 🌐 Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=        # Public Supabase URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=  # Public anon key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=  # Auth redirect
```

---

## 📱 Responsive Design

Breakpoints:
- Mobile: `default`
- Tablet: `md:` (768px)
- Desktop: `lg:` (1024px)

Example:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols */}
</div>
```

---

## 🎨 Component Usage

### Card
```tsx
<Card className="bg-gradient-to-br from-primary/5 to-transparent">
  <CardContent className="p-8">
    {/* Content */}
  </CardContent>
</Card>
```

### Button
```tsx
<Button size="lg" className="rounded-lg">
  Click Me
</Button>
```

### Badge
```tsx
<Badge variant="outline">Status</Badge>
```

---

## 📊 Performance Tips

1. **Use Server Components by default**
   ```tsx
   export default async function Page() { }  // ✅ Good
   ```

2. **Client only when needed**
   ```tsx
   'use client'  // Mark client components
   export function Component() { }
   ```

3. **Optimize images**
   ```tsx
   <img src="/logo.svg" alt="Logo" className="w-16 h-16" />
   ```

4. **Cache queries**
   ```tsx
   const { data } = useSWR('/api/endpoint', fetcher)
   ```

---

## 🧪 Testing

```bash
# Run tests
npm run test

# Coverage
npm run test:coverage

# Type check
npm run type-check

# Lint
npm run lint
```

---

## 🚢 Deployment

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Vercel Auto-Deploy**
   - Automatically deploys on push
   - Set env vars in Vercel dashboard

3. **Database Migrations**
   - Run in Supabase dashboard
   - Or via migrations in scripts/

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Project overview |
| `WALLET_GUIDE.md` | User guide |
| `DEVELOPER_GUIDE.md` | Engineering details |
| `PLATFORM_INFO.md` | Architecture |
| `PROJECT_SUMMARY.md` | Complete summary |
| `QUICK_REFERENCE.md` | This file |

---

## 🆘 Troubleshooting

### Login not working?
- Check `.env.local` has correct Supabase URL and key
- Verify email confirmation is enabled
- Check RLS policies allow access

### Page is slow?
- Check React Compiler is enabled
- Verify database queries are indexed
- Use Server Components where possible
- Check bundle size

### Styling issues?
- Check Tailwind config is loaded
- Verify design tokens in globals.css
- Use `@apply` for custom classes
- Check class names are exact

---

## 💡 Best Practices

✅ **Do:**
- Use TypeScript everywhere
- Server Components by default
- Semantic HTML
- Mobile-first CSS
- Component composition
- Meaningful commit messages

❌ **Don't:**
- Client Components for everything
- Client-side only state
- Inline styles
- Magic numbers
- Deeply nested components
- Hardcoded values

---

## 🔗 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

## 🎓 Learning Resources

1. **React Server Components**: Official Next.js guide
2. **Row Level Security**: Supabase docs on RLS
3. **Tailwind Design System**: Tailwind configuration guide
4. **Performance**: web.dev/performance

---

**Happy coding! Remember: "Peace of Mind for Your Digital Life"** 🏠
