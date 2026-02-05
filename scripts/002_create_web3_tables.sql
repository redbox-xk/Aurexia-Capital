-- Web3 Wallets Table (extends basic wallets)
-- Stores blockchain wallet addresses and metadata
CREATE TABLE IF NOT EXISTS public.web3_wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT NOT NULL UNIQUE,
  public_key TEXT,
  network TEXT NOT NULL DEFAULT 'ethereum',
  balance TEXT DEFAULT '0',
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on web3_wallets
ALTER TABLE public.web3_wallets ENABLE ROW LEVEL SECURITY;

-- RLS Policies for web3_wallets
CREATE POLICY "Users can view their own wallets" ON public.web3_wallets
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own wallets" ON public.web3_wallets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own wallets" ON public.web3_wallets
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own wallets" ON public.web3_wallets
  FOR DELETE USING (auth.uid() = user_id);

-- Web3 Transactions Table
CREATE TABLE IF NOT EXISTS public.web3_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  wallet_id UUID NOT NULL REFERENCES public.web3_wallets(id) ON DELETE CASCADE,
  hash TEXT NOT NULL,
  from_address TEXT NOT NULL,
  to_address TEXT NOT NULL,
  amount TEXT NOT NULL,
  network TEXT NOT NULL DEFAULT 'ethereum',
  type TEXT NOT NULL CHECK (type IN ('send', 'receive')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'failed')),
  gas_used TEXT,
  gas_price TEXT,
  block_number BIGINT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  confirmed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on web3_transactions
ALTER TABLE public.web3_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for web3_transactions
CREATE POLICY "Users can view their own transactions" ON public.web3_transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own transactions" ON public.web3_transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own transactions" ON public.web3_transactions
  FOR UPDATE USING (auth.uid() = user_id);

-- Web3 Contacts Table
CREATE TABLE IF NOT EXISTS public.web3_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  network TEXT NOT NULL DEFAULT 'ethereum',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on web3_contacts
ALTER TABLE public.web3_contacts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for web3_contacts
CREATE POLICY "Users can view their own contacts" ON public.web3_contacts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own contacts" ON public.web3_contacts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own contacts" ON public.web3_contacts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own contacts" ON public.web3_contacts
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_web3_wallets_user_id ON public.web3_wallets(user_id);
CREATE INDEX IF NOT EXISTS idx_web3_wallets_address ON public.web3_wallets(address);
CREATE INDEX IF NOT EXISTS idx_web3_transactions_user_id ON public.web3_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_web3_transactions_wallet_id ON public.web3_transactions(wallet_id);
CREATE INDEX IF NOT EXISTS idx_web3_transactions_hash ON public.web3_transactions(hash);
CREATE INDEX IF NOT EXISTS idx_web3_contacts_user_id ON public.web3_contacts(user_id);
