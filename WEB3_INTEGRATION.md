# Flash Wallet - Web3 Integration Guide

## Overview

Flash Wallet is now a fully functional Web3 cryptocurrency wallet with live mainnet integration using Infura and Web3Auth.

## Supported Networks

### Mainnet Networks (Live)
- **Ethereum** (Chain ID: 1)
  - RPC: https://mainnet.infura.io/v3/{INFURA_KEY}
  - Block Explorer: https://etherscan.io

- **Polygon** (Chain ID: 137)
  - RPC: https://polygon-mainnet.infura.io/v3/{INFURA_KEY}
  - Block Explorer: https://polygonscan.com

- **Optimism** (Chain ID: 10)
  - RPC: https://optimism-mainnet.infura.io/v3/{INFURA_KEY}
  - Block Explorer: https://optimistic.etherscan.io

- **Arbitrum** (Chain ID: 42161)
  - RPC: https://arbitrum-mainnet.infura.io/v3/{INFURA_KEY}
  - Block Explorer: https://arbiscan.io

## Environment Configuration

Required environment variables:

```env
# Web3Auth
NEXT_PUBLIC_WEB3AUTH_CLIENT_ID=BAVEm77T_3OMLdAC8aMYaK9yC04AvW8agvdREt3_GJOdBEFV3_lrayw0GBD0pSObMIe7mr7wFRY_j8KAR9wSLcU
WEB3AUTH_SECRET=d0ec514c13c24557cfa22d90da8e247cc881d3927b0ec04c162e3899da7cdfb5

# Infura
NEXT_PUBLIC_INFURA_KEY=296828ccac464983a1e7d458100d140f
NEXT_PUBLIC_INFURA_WS=wss://mainnet.infura.io/ws/v3/296828ccac464983a1e7d458100d140f

# Network RPC Endpoints
NEXT_PUBLIC_ETH_RPC=https://mainnet.infura.io/v3/296828ccac464983a1e7d458100d140f
NEXT_PUBLIC_POLYGON_RPC=https://polygon-mainnet.infura.io/v3/296828ccac464983a1e7d458100d140f
NEXT_PUBLIC_OPTIMISM_RPC=https://optimism-mainnet.infura.io/v3/296828ccac464983a1e7d458100d140f
NEXT_PUBLIC_ARBITRUM_RPC=https://arbitrum-mainnet.infura.io/v3/296828ccac464983a1e7d458100d140f

# Web3Auth JWKS
NEXT_PUBLIC_JWKS_ENDPOINT=https://api-auth.web3auth.io/.well-known/jwks.json
```

## Core Web3 Features

### 1. Wallet Creation & Import

**Create New Wallet:**
- Generates random Ethereum wallet
- Stores address and public key in database
- Supports multiple wallets per user
- Can be set as primary wallet

**Import Existing Wallet:**
- Import by private key
- Import by recovery phrase (BIP39)
- Validates wallet on import

**Location:** `components/dashboard/create-wallet-web3.tsx`

### 2. Real-time Balance Checking

Fetches live balance from blockchain:
```typescript
const { balance, formatted } = await getBalance(address, 'ethereum')
// Returns formatted balance in native currency
```

**Features:**
- Supports all configured networks
- Automatic balance refresh
- Gas price estimation
- Transaction cost calculation

**Location:** `lib/web3/blockchain.ts`

### 3. Send Transactions

Complete transaction flow:
- Recipient address validation
- Gas estimation
- Balance verification
- Transaction review & confirmation
- Real-time gas price display

**Location:** `components/dashboard/send-web3.tsx`

### 4. Receive Funds

**Features:**
- Display wallet address
- QR code generation
- Address sharing
- Explorer links
- Transaction history

**Location:** `components/dashboard/receive-web3.tsx`

### 5. Transaction History

Tracks all transactions:
- Send/receive type
- Amount and gas used
- Block number and status
- Timestamps

**Location:** `lib/web3/blockchain.ts` (integration)

## File Structure

```
lib/web3/
├── config.ts           # Network configurations & constants
├── blockchain.ts       # Blockchain operations (balance, gas, etc)
├── wallet.ts           # Wallet creation & management
├── auth-provider.ts    # Web3Auth integration
└── context.ts          # React Context for Web3 state

components/
├── web3-provider.tsx   # Web3 context provider
├── dashboard/
│   ├── create-wallet-web3.tsx    # Wallet creation UI
│   ├── wallet-display.tsx         # Wallet card display
│   ├── send-web3.tsx             # Send transaction UI
│   ├── receive-web3.tsx          # Receive UI
│   └── wallets-manager-web3.tsx  # Wallets management

scripts/
├── 001_create_wallet_schema.sql  # Original schema
└── 002_create_web3_tables.sql    # Web3 extension tables
```

## Live Functions

All functions are implemented and ready to use:

### Wallet Operations
- `createNewWallet()` - Generate new Ethereum wallet
- `importWalletFromPrivateKey()` - Import existing wallet
- `importWalletFromMnemonic()` - Import from BIP39 phrase
- `getAccountDetails()` - Get wallet info & balance
- `signMessage()` - Sign arbitrary messages
- `sendTransaction()` - Send ETH/tokens

### Blockchain Operations
- `getBalance()` - Fetch current balance
- `getGasPrice()` - Get current gas prices
- `estimateGasTransfer()` - Calculate transaction cost
- `getNetworkInfo()` - Get network status
- `validateAddress()` - Validate Ethereum addresses
- `formatAddress()` - Format address for display
- `getExplorerUrl()` - Get block explorer links

### Transaction Operations
- `getTransactionHistory()` - Fetch transaction list
- `getTransactionUrl()` - Get explorer URL for tx hash

## Security Considerations

### Private Key Management
- **Never** store private keys in plaintext in database
- Use Web3Auth for key management in production
- Private keys only in memory during transactions

### Best Practices
- Always validate recipient addresses
- Show transaction details before confirmation
- Use RLS policies on all database tables
- Verify environment variables before deployment

## Database Schema

### web3_wallets
```sql
- id: UUID (primary key)
- user_id: UUID (foreign key to auth.users)
- name: TEXT (wallet name)
- address: TEXT (Ethereum address, unique)
- public_key: TEXT
- network: TEXT (ethereum, polygon, optimism, arbitrum)
- balance: TEXT (stored as string for precision)
- is_primary: BOOLEAN
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### web3_transactions
```sql
- id: UUID (primary key)
- user_id: UUID (foreign key)
- wallet_id: UUID (foreign key to web3_wallets)
- hash: TEXT (transaction hash)
- from_address: TEXT
- to_address: TEXT
- amount: TEXT
- network: TEXT
- type: TEXT (send/receive)
- status: TEXT (pending/confirmed/failed)
- gas_used: TEXT
- gas_price: TEXT
- block_number: BIGINT
- created_at: TIMESTAMP
- confirmed_at: TIMESTAMP
```

### web3_contacts
```sql
- id: UUID (primary key)
- user_id: UUID (foreign key)
- name: TEXT
- address: TEXT (Ethereum address)
- network: TEXT
- created_at: TIMESTAMP
```

## API Routes

### Dashboard Actions
- `createWallet(name, network)` - Create new wallet
- `getWallets()` - Fetch user's wallets
- `updateWallet(walletId, updates)` - Update wallet
- `deleteWallet(walletId)` - Delete wallet
- `addTransaction(data)` - Record transaction
- `getTransactionHistory(walletId)` - Fetch history

**Location:** `app/dashboard/actions.ts`

## Deployment

### Prerequisites
1. Supabase project created
2. Web3Auth account setup
3. Infura project created
4. Database migrations applied

### Steps
1. Set all environment variables in Vercel
2. Run database migrations: `scripts/002_create_web3_tables.sql`
3. Deploy to Vercel
4. Test wallet creation and balance fetching

### Monitoring
- Check Infura usage in dashboard
- Monitor transaction costs
- Track failed transactions in database
- Review Web3Auth logs

## Testing

### Create Wallet
1. Go to Dashboard → Wallets
2. Click "Create Wallet"
3. Enter wallet name
4. Select network (default: Ethereum)
5. Wallet created with real address

### Check Balance
1. Create wallet
2. Send testnet ETH to address
3. Balance updates automatically
4. View on block explorer

### Send Transaction (Requires Web3Auth)
1. Go to Dashboard → Send
2. Enter recipient address
3. Enter amount
4. Click "Estimate Gas"
5. Review transaction details
6. Confirm with Web3Auth

## Troubleshooting

### "Insufficient balance"
- Ensure wallet has ETH for gas fees
- Check network is correct
- Verify amount + gas < balance

### "Invalid address"
- Recipient must be valid Ethereum address
- Remove spaces or extra characters
- Double-check checksums

### "Gas estimation failed"
- Recipient address may not exist
- Insufficient balance for transfer
- Network RPC may be temporary down

### "Balance not updating"
- Wait a few seconds for Infura sync
- Check wallet address is correct
- Verify network selection matches address

## Future Enhancements

- [ ] Token swaps (Uniswap integration)
- [ ] ENS name support
- [ ] Multi-signature wallets
- [ ] Hardware wallet support (Ledger, Trezor)
- [ ] Staking features
- [ ] DeFi interactions
- [ ] Token management
- [ ] Portfolio analytics

## Support

For issues or questions:
1. Check WEB3_INTEGRATION.md (this file)
2. Review code comments in lib/web3/
3. Check Infura & Web3Auth documentation
4. Review database RLS policies
