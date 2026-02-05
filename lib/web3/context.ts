'use client';

import { createContext } from 'react'
import { NETWORKS, NetworkKey } from './config'

export interface Web3ContextType {
  // Account
  address: string | null
  isConnected: boolean
  chainId: number | null
  
  // Network
  network: NetworkKey
  setNetwork: (network: NetworkKey) => void
  
  // Operations
  getBalance: (address?: string) => Promise<string>
  sendTransaction: (to: string, amount: string) => Promise<string>
  signMessage: (message: string) => Promise<string>
  
  // Status
  loading: boolean
  error: string | null
}

export const Web3Context = createContext<Web3ContextType | undefined>(undefined)

export function useWeb3() {
  const context = React.useContext(Web3Context)
  if (!context) {
    throw new Error('useWeb3 must be used within Web3Provider')
  }
  return context
}

import React from 'react'

export const { Provider: Web3Provider } = Web3Context as any
