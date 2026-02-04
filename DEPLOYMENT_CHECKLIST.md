# Flash Wallet - Deployment Checklist

## Pre-Deployment Review

### Code Quality
- [ ] All TypeScript types are strict (`strict: true`)
- [ ] No `any` types in the codebase
- [ ] ESLint passes (`npm run lint`)
- [ ] Type checking passes (`npm run type-check`)
- [ ] No console.log([v0]) debug statements remain
- [ ] No hardcoded secrets in code
- [ ] No broken links or references

### Security
- [ ] All database tables have RLS enabled
- [ ] RLS policies are correctly configured
- [ ] Environment variables are not in code
- [ ] `.env.local` is in `.gitignore`
- [ ] Middleware checks authentication
- [ ] Server Actions validate inputs
- [ ] No SQL injection vulnerabilities
- [ ] Password validation is enforced

### Performance
- [ ] React Compiler enabled in next.config.mjs
- [ ] No unused dependencies
- [ ] Images optimized (AVIF/WebP)
- [ ] Code splitting is automatic
- [ ] Bundle size is acceptable
- [ ] Lighthouse score > 90
- [ ] Page load time < 1 second

### UX/Design
- [ ] Flash Wallet logo appears everywhere (desktop & mobile)
- [ ] Color palette follows design system
- [ ] Typography is consistent
- [ ] Responsive design tested on mobile
- [ ] Dark mode works properly
- [ ] All CTA buttons are visible
- [ ] Error messages are clear
- [ ] Loading states are present

### Documentation
- [ ] README.md is complete
- [ ] WALLET_GUIDE.md is up to date
- [ ] DEVELOPER_GUIDE.md covers all features
- [ ] Deployment instructions are clear
- [ ] Environment variables are documented

---

## Supabase Setup Checklist

### Database
- [ ] Supabase project created
- [ ] PostgreSQL database running
- [ ] Database URL obtained
- [ ] Anon key obtained
- [ ] Schema migration script ready

### Authentication
- [ ] Email provider configured
- [ ] Email templates customized (optional)
- [ ] SMTP configured for verification emails
- [ ] Redirect URLs set in Auth settings
- [ ] Session duration configured
- [ ] Email confirmation enabled

### Row Level Security
- [ ] `profiles` table has RLS policies
- [ ] `wallets` table has RLS policies
- [ ] `transactions` table has RLS policies
- [ ] `contacts` table has RLS policies
- [ ] All SELECT policies tested
- [ ] All INSERT policies tested
- [ ] All UPDATE policies tested
- [ ] All DELETE policies tested

### Database Migrations
- [ ] Migration script created (001_create_wallet_schema.sql)
- [ ] Tables created in Supabase
- [ ] Indexes created for performance
- [ ] Foreign keys established
- [ ] Sample data added (optional)

---

## Vercel Setup Checklist

### Project Configuration
- [ ] GitHub repository connected
- [ ] Main branch selected for deployment
- [ ] Node.js version set to 18+
- [ ] npm install configured
- [ ] Build command: `npm run build`
- [ ] Start command: `npm start`

### Environment Variables
- [ ] `NEXT_PUBLIC_SUPABASE_URL` set
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` set
- [ ] `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` set to production domain
- [ ] No secrets in environment variables
- [ ] Variables propagated to Edge Functions (if used)

### Deployment Settings
- [ ] Auto-deployment on git push enabled
- [ ] Preview deployments enabled
- [ ] Production branch: main
- [ ] Deploy settings visible and correct

### Custom Domain (if applicable)
- [ ] Custom domain added to Vercel
- [ ] DNS records configured
- [ ] SSL certificate generated
- [ ] HTTPS enforced
- [ ] Domain forwarding configured (if needed)

---

## Testing Checklist

### Authentication Flow
- [ ] Sign up creates new account
- [ ] Verification email sent
- [ ] Email verification link works
- [ ] Confirmed users can login
- [ ] Wrong password rejected
- [ ] Session persists on page reload
- [ ] Logout clears session
- [ ] Protected pages redirect to login

### Dashboard Features
- [ ] Dashboard loads after login
- [ ] Wallet list displays correctly
- [ ] Can create new wallet
- [ ] Can set primary wallet
- [ ] Can delete wallet
- [ ] Can view wallet details
- [ ] Balance updates in real-time

### Transaction Features
- [ ] Can send funds (form validation)
- [ ] Can receive funds (QR code works)
- [ ] Transaction history displays
- [ ] Transactions can be filtered
- [ ] Transaction details show correctly

### Profile Features
- [ ] User profile displays correctly
- [ ] Can update profile information
- [ ] Can change password
- [ ] Security settings visible
- [ ] Sign out works correctly

### Mobile Testing
- [ ] Pages display correctly on mobile
- [ ] Bottom navigation works
- [ ] Forms are usable on mobile
- [ ] Touch interactions work
- [ ] Responsive breakpoints correct
- [ ] Landscape and portrait modes work

### Browser Compatibility
- [ ] Chrome / Chromium (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers tested

### Performance Testing
- [ ] Page load time < 1 second
- [ ] Interactions respond instantly
- [ ] Database queries are fast
- [ ] Images load optimally
- [ ] No layout shifts (CLS < 0.1)

---

## Database Migration Steps

### 1. Create Migration File
```sql
-- scripts/001_create_wallet_schema.sql
-- Copy content from PLATFORM_INFO.md database section
```

### 2. Run in Supabase Dashboard
- [ ] Open SQL editor in Supabase dashboard
- [ ] Copy-paste migration script
- [ ] Execute script
- [ ] Verify tables created
- [ ] Verify RLS policies applied

### 3. Verify Schema
```sql
-- Check tables exist
SELECT tablename FROM pg_tables 
WHERE schemaname = 'public';

-- Check RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_class c 
JOIN pg_namespace n ON n.oid = c.relnamespace 
WHERE n.nspname = 'public';
```

### 4. Test RLS Policies
- [ ] Create test user
- [ ] Verify can access own data
- [ ] Verify cannot access other's data
- [ ] Test all CRUD operations

---

## Post-Deployment Verification

### Verify Production Deployment
- [ ] Website loads at production URL
- [ ] Flash Wallet logo appears correctly
- [ ] All pages are accessible
- [ ] Authentication works end-to-end
- [ ] Database operations work
- [ ] Error pages display properly

### Monitor Performance
- [ ] Check Vercel Analytics
- [ ] Monitor response times
- [ ] Check error rates
- [ ] Monitor database performance
- [ ] Set up alerts for issues

### Security Verification
- [ ] SSL certificate is valid
- [ ] HTTPS is enforced
- [ ] Security headers are present
- [ ] Content Security Policy active
- [ ] No sensitive data in logs

### User Acceptance Testing
- [ ] Users can sign up
- [ ] Users can login
- [ ] Users can create wallets
- [ ] Users can view transactions
- [ ] Users report no issues

---

## Monitoring & Maintenance

### Daily
- [ ] Check error logs
- [ ] Monitor uptime
- [ ] Review user feedback
- [ ] Check database health

### Weekly
- [ ] Review analytics
- [ ] Check performance metrics
- [ ] Monitor security alerts
- [ ] Backup database (if manual)

### Monthly
- [ ] Review deployment logs
- [ ] Update dependencies (security)
- [ ] Performance optimization review
- [ ] User feedback analysis

---

## Rollback Plan

If deployment fails:

1. **Revert Code**
   ```bash
   git revert <commit-hash>
   git push origin main
   # Vercel automatically re-deploys
   ```

2. **Revert Database**
   - Keep backup of previous schema
   - Restore from backup if needed
   - Document what was rolled back

3. **Notify Users**
   - Post status update
   - Apologize for inconvenience
   - Provide ETA for fix

---

## Success Criteria

- ✅ All tests pass
- ✅ No errors in production
- ✅ Performance meets targets
- ✅ Users can complete all workflows
- ✅ No security vulnerabilities
- ✅ Documentation is accurate
- ✅ Team is comfortable with deployment

---

## Deployment Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Lead Developer | | | |
| Security Lead | | | |
| Product Manager | | | |
| DevOps | | | |

---

## Contact & Support

- **Technical Issues**: Check Vercel dashboard or logs
- **Database Issues**: Check Supabase dashboard
- **Authentication Issues**: Check Supabase Auth settings
- **Performance Issues**: Check Vercel Analytics or Lighthouse

---

## Quick Command Reference

```bash
# Verify build
npm run build

# Check types
npm run type-check

# Lint code
npm run lint

# Format code
npm run format

# Check performance
npx lighthouse https://yourdomain.com

# View deployment logs
vercel logs

# Rollback
git revert <commit>
git push origin main
```

---

**Ready to deploy Flash Wallet! 🚀**

Remember: "Peace of Mind for Your Digital Life"

Post-deployment, monitor carefully and be ready to respond quickly to any issues.
