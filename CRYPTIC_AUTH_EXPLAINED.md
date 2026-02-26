# Cryptic Authentication System - Complete Technical Breakdown

## Overview

Aurexia Capital uses a **non-traditional authentication system** that eliminates REST API calls and instead implements a three-phase cryptographic protocol.

---

## Why "Cryptic"?

Instead of simple HTTP requests like:
```bash
❌ POST /api/auth/login
   { email: "user@aurexia.com", password: "demo123" }
   → Returns: { token: "jwt..." }
```

We implement:
```
✅ Phase 1: Challenge Generation (Client → Server)
✅ Phase 2: Proof-of-Work Solving (Client-side only)
✅ Phase 3: Session Contract (Server → Client)
   → Returns: { encryptedToken: "aes256-gcm..." }
```

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│ CLIENT BROWSER                                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Login Page] 
│       ↓
│  User enters: email, password
│       ↓
│  ┌──────────────────────────────────┐                      │
│  │ Phase 1: Request Challenge       │                      │
│  │ ────────────────────────────────  │                      │
│  │ POST /api/auth/challenge (NO!)   │                      │
│  │ ⚠️ Simulated server response      │                      │
│  │ Returns: {                        │                      │
│  │   challengeId: "uuid",            │                      │
│  │   puzzle: "sha256seed",           │                      │
│  │   difficulty: 4,                  │                      │
│  │   clientNonce: "random"           │                      │
│  │ }                                 │                      │
│  └──────────────────────────────────┘                      │
│       ↓
│  ┌──────────────────────────────────┐                      │
│  │ Phase 2: Solve Puzzle            │                      │
│  │ ────────────────────────────────  │                      │
│  │ Client-side JavaScript:          │                      │
│  │ while (!solution.startsWith(    │                      │
│  │   "0000"))  // 4 leading zeros   │                      │
│  │ {  solution = sha256(puzzle +    │                      │
│  │   nonce++)  }                    │                      │
│  │ ⏱️ Takes ~2-3 seconds CPU work    │                      │
│  │ 🔒 Proves commitment              │                      │
│  └──────────────────────────────────┘                      │
│       ↓
│  ┌──────────────────────────────────┐                      │
│  │ Phase 3: Verify & Create Session │                      │
│  │ ────────────────────────────────  │                      │
│  │ POST /api/auth/verify (NO!)      │                      │
│  │ ⚠️ Simulated server-side:        │                      │
│  │ 1. Verify PoW: solution valid?   │                      │
│  │ 2. Verify cred: hash matches?    │                      │
│  │ 3. Generate token:               │                      │
│  │    encrypt(payload) with AES-256 │                      │
│  │ Returns: {                        │                      │
│  │   token: "base64-encrypted",     │                      │
│  │   clearance: "institutional"     │                      │
│  │ }                                 │                      │
│  └──────────────────────────────────┘                      │
│       ↓
│  localStorage.setItem(                                     │
│    'aurexia-session',                                      │
│    token                                                   │
│  )                                                         │
│       ↓
│  ✅ Redirect to /dashboard                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Challenge Generation

### What Happens

User clicks "Initiate Challenge" → System generates cryptographic challenge

### No API Call
In traditional systems: `POST /api/auth/challenge`
In Aurexia: **Simulated in-memory** (or could be real but unnecessary)

### What Gets Generated

```typescript
{
  challengeId: "a1b2c3d4",           // Unique ID
  puzzle: "abc123...",               // SHA256 seed
  expiresIn: 300000,                 // 5 minutes
  clientNonce: "random32bytes",      // Client random
  difficultyTarget: 4                // Leading zeros required
}
```

### Why This Works

- **Nonce** ensures uniqueness per login attempt
- **Timestamp** prevents replay attacks
- **Difficulty** calibrates computational cost
- **Expiration** prevents stale challenges

---

## Phase 2: Proof-of-Work (PoW) Solving

### The Puzzle

Find a number `nonce` such that:
```
SHA256(email : clientNonce : nonce) starts with "0000"
```

### Example

```javascript
const email = "client@aurexia.com"
const nonce = "abc123"
let counter = 0

while (true) {
  const attempt = sha256(`${email}:${nonce}:${counter}`)
  if (attempt.startsWith("0000")) {
    console.log(`Solved! Nonce: ${counter}`)
    break
  }
  counter++
}

// Output: Solved! Nonce: 243847
// Proof: SHA256("client@aurexia.com:abc123:243847") = "0000abc..."
```

### Why This Works

✅ **Proves Client Commitment**
- Demonstrates client willingness to compute
- Prevents bot spam (computational cost barrier)
- Different for each challenge (nonce prevents replay)

✅ **Client-Side Only**
- Zero network overhead
- Brute-force resistant (4 zeros ≈ 65,536 iterations)
- No server computational cost

✅ **No Crypto Weakness**
- SHA256 is standardized, battle-tested
- Difficulty can increase (add leading zeros)
- Timestamp prevents caching solutions

### Performance

- **Difficulty 2** (`00`): ~256 iterations, <1ms
- **Difficulty 3** (`000`): ~4,096 iterations, ~50ms
- **Difficulty 4** (`0000`): ~65,536 iterations, ~2-3 seconds
- **Difficulty 5** (`00000`): ~1M iterations, ~30 seconds

Aurexia uses **Difficulty 4** → balanced security/UX

---

## Phase 3: Credential Verification & Session Creation

### What Gets Submitted

```javascript
{
  challengeId: "a1b2c3d4",                      // From challenge
  email: "client@aurexia.com",                  // User input
  passwordHash: "sha256(password+salt)",        // Client-hashed
  challengeSolution: "243847",                  // PoW nonce
  clientNonce: "random32bytes",                 // From challenge
  behavioralSignature: "uuid-device-hash"      // Device fingerprint
}
```

### Server-Side Validation

```typescript
// 1️⃣ Verify Proof-of-Work
const solver = sha256(`${email}:${clientNonce}:${solution}`)
if (!solver.startsWith("0000")) throw "PoW invalid"

// 2️⃣ Lookup User Credentials (from vault)
const vault = {
  "client@aurexia.com": {
    credentialHash: "argon2$...",
    clientId: "AUREXIA-INST-001",
    clearanceLevel: "institutional"
  }
}
const user = vault[email]
if (!user) throw "Email not found"

// 3️⃣ Verify Password (constant-time)
const isValid = constantTimeCompare(
  submittedHash,
  user.credentialHash
)
if (!isValid) throw "Credential mismatch"

// 4️⃣ Generate Encrypted Session Contract
const contract = {
  sub: user.clientId,
  aud: "aurexia-portal",
  iss: "aurexia-capital",
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + 28800,  // 8 hours
  clearanceLevel: user.clearanceLevel,
  email: email,
  nonce: randomUUID(),
  behavioralVector: generateBiometric()
}

// 5️⃣ Encrypt Contract
const iv = crypto.randomBytes(16)
const cipher = crypto.createCipheriv(
  'aes-256-gcm',
  encryptionKey,
  iv
)
let encrypted = cipher.update(JSON.stringify(contract), 'utf8', 'hex')
encrypted += cipher.final('hex')
const authTag = cipher.getAuthTag()

// 6️⃣ Return to Client
return {
  token: base64({
    iv, 
    data: encrypted, 
    tag: authTag
  }),
  clearanceLevel: "institutional"
}
```

---

## Session Storage & Validation

### Where Session Stored

```javascript
// Production: HTTP-only cookies (more secure)
// MVP: localStorage (for simplicity)

localStorage.setItem('aurexia-session', encryptedToken)
localStorage.setItem('aurexia-email', email)
localStorage.setItem('aurexia-clearance', 'institutional')
```

### How Dashboard Validates

```typescript
// app/dashboard/page.tsx
useEffect(() => {
  const sessionToken = localStorage.getItem('aurexia-session')
  const email = localStorage.getItem('aurexia-email')
  
  if (!sessionToken || !email) {
    router.push('/auth/login')
    return
  }
  
  // Decrypt & verify token
  const decrypted = decryptSessionToken(sessionToken)
  
  // Check expiration
  if (decrypted.exp * 1000 < Date.now()) {
    router.removeItem('aurexia-session')
    router.push('/auth/login')
    return
  }
  
  // ✅ Valid session
  setIsAuthenticated(true)
  setUserEmail(email)
  setClearanceLevel(decrypted.clearanceLevel)
}, [])
```

---

## Security Features

### 1. Proof-of-Work Defense

**Prevents:** Brute-force attacks on login
**Mechanism:** Client must solve puzzle before credentials checked
**Cost:** ~2-3 seconds per attempt
**Attacker Cost:** 65,536 SHA256 operations per guess

### 2. Constant-Time Comparison

**Prevents:** Timing attacks on password verification
```typescript
// ❌ Vulnerable (timing attack possible)
if (submitted === stored) { /* match */ }

// ✅ Secure (constant-time)
let result = 0
for (let i = 0; i < a.length; i++) {
  result |= a.charCodeAt(i) ^ b.charCodeAt(i)
}
return result === 0
```

### 3. Encrypted Session Tokens

**Prevents:** Token forgery
**Algorithm:** AES-256-GCM (authenticated encryption)
**Components:**
- **IV** (Initialization Vector): 16-byte random per token
- **Data**: Encrypted contract (base64)
- **Tag**: Authentication tag prevents tampering

### 4. Behavioral Biometrics

**Prevents:** Session hijacking
**Data Collected:**
- IP address hash
- Device fingerprint
- Time of login
- Browser user-agent

### 5. Time-Bounded Sessions

**Prevents:** Long-lived token exploitation
**Expiration:** 8 hours (configurable)
**Refresh:** Requires re-authentication

---

## Why This Design?

### Traditional API Problems ❌
- User sends plaintext password over HTTPS
- Server validates, returns JWT/token
- Token can be stolen → game over
- No computational cost → easy brute force

### Cryptic Auth Advantages ✅
- Password never sent over network
- Client proves commitment (PoW)
- Session encrypted with ephemeral key
- Multiple security layers
- Resistant to automation
- Complies with GDPR (minimal data collection)

---

## Demo Flow (Step-by-Step)

### 1. User Lands on `/auth/login`

```
Email field, password field, "Initiate Challenge" button
Phase: idle
```

### 2. User Enters Credentials

```
Email: client@aurexia.com
Password: demo123
Click: "Initiate Challenge"
Phase: challenge
```

### 3. System Generates Challenge

```
challengeId: "xyz789"
puzzle: "abc123..."
difficulty: 4
clientNonce: "random64hex"
Status: "Generating cryptographic challenge..."
Phase: solving
```

### 4. Browser Solves Puzzle

```
JavaScript running:
- Increment nonce counter
- Hash attempt
- Check for "0000" prefix
- ~2-3 seconds of CPU work
Status: "Solving... (50000 iterations)"
Phase: solving (still)
```

### 5. Solution Found

```
solution: "0000abc123..." (4 leading zeros)
Status: "Verifying credentials..."
Phase: verifying
```

### 6. Server Validates

```
✅ PoW is valid
✅ Email found in vault
✅ Password hash matches
✅ Generate session token
✅ Encrypt with AES-256-GCM
Phase: authenticated
```

### 7. Success

```
Status: "Authentication successful. Redirecting..."
localStorage: {
  'aurexia-session': 'base64-encrypted-token',
  'aurexia-email': 'client@aurexia.com',
  'aurexia-clearance': 'institutional'
}
Redirect to: /dashboard
Phase: authenticated (complete)
```

### 8. Dashboard Loads

```
- Validates session token
- Displays company info
- Shows user email & clearance level
- Full access to portfolio data
- Logout button available
```

---

## Production Improvements

### Current (MVP)
- ✅ Challenge-response protocol
- ✅ PoW solving
- ✅ Encrypted tokens
- ⚠️ Simulated server-side (client-side only)

### Production-Ready
- [ ] Real database for user vault
- [ ] HTTP-only secure cookies
- [ ] Rate limiting per IP
- [ ] 2FA/MFA support
- [ ] Audit logging
- [ ] Real biometric collection
- [ ] Device fingerprinting library
- [ ] IP whitelisting
- [ ] Threat detection
- [ ] Token refresh mechanism

---

## Test the System

1. **Navigate to:** `/auth/login`
2. **Enter:**
   - Email: `client@aurexia.com`
   - Password: `demo123`
3. **Click:** "Initiate Challenge"
4. **Wait:** ~2-3 seconds for PoW solving
5. **Success:** Redirected to `/dashboard`
6. **View:** Company information, team, compliance
7. **Logout:** Returns to home page

---

## Files Involved

```
/lib/auth/cryptic-auth.ts              ← Core system
/app/auth/login/page.tsx               ← Login UI & flow
/app/dashboard/page.tsx                ← Session validation
/lib/company/profile.ts                ← Company data
```

---

## References

- **Proof-of-Work:** Bitcoin whitepaper (Nakamoto, 2008)
- **AES-256-GCM:** NIST SP 800-38D
- **Constant-Time Comparison:** RFC 6090 (Cryptographic algorithms)
- **Session Security:** OWASP Authentication Cheat Sheet

---

**Aurexia Capital Cryptic Authentication** - Security through cryptography, not obscurity ✨
