export interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Wallet {
  id: string
  user_id: string
  name: string
  address: string
  balance: number
  currency: string
  is_primary: boolean
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  wallet_id: string
  type: "send" | "receive"
  amount: number
  currency: string
  from_address: string | null
  to_address: string | null
  status: "pending" | "completed" | "failed"
  description: string | null
  created_at: string
}

export interface Contact {
  id: string
  user_id: string
  name: string
  address: string
  created_at: string
}
