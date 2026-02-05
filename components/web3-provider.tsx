'use client'

import { ReactNode, useState, useCallback, useEffect } from 'react'
import { Web3Context, Web3ContextType } from '@/lib/web3/context'
import { getBalance, getNetworkInfo } from '@/lib/web3/blockchain'
import { DEFAULT_NETWORK, NETWORKS } from '@/lib/web3/config'
import { NetworkKey } from '@/lib/web3/config'

interface Web3ProviderProps {
  children: ReactNode
  address?: string
  chainId?: number
}

export function Web3Provider({ children, address: initialAddress, chainId }: Web3ProviderProps) {
  const [address, setAddress] = useState<string | null>(initialAddress || null)
  const [currentNetwork, setCurrentNetwork] = useState<NetworkKey>(DEFAULT_NETWORK)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGetBalance = useCallback(
    async (addr?: string) => {
      setLoading(true)
      setError(null)
      try {
        const result = await getBalance(addr || address || '', currentNetwork)
        return result.formatted
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to get balance'
        setError(message)
        return '0'
      } finally {
        setLoading(false)
      }
    },
    [address, currentNetwork]
  )

  const handleSendTransaction = useCallback(
    async (to: string, amount: string) => {
      setLoading(true)
      setError(null)
      try {
        if (!address) throw new Error('Wallet not connected')
        // This would require private key access - in production use Web3Auth
        throw new Error('Transaction signing requires Web3Auth integration')
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to send transaction'
        setError(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [address]
  )

  const handleSignMessage = useCallback(
    async (message: string) => {
      setLoading(true)
      setError(null)
      try {
        if (!address) throw new Error('Wallet not connected')
        // This would require private key access - in production use Web3Auth
        throw new Error('Message signing requires Web3Auth integration')
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to sign message'
        setError(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [address]
  )

  const handleSetNetwork = useCallback((network: NetworkKey) => {
    setCurrentNetwork(network)
    setError(null)
  }, [])

  const value: Web3ContextType = {
    address,
    isConnected: !!address,
    chainId: chainId || NETWORKS[currentNetwork].chainId,
    network: currentNetwork,
    setNetwork: handleSetNetwork,
    getBalance: handleGetBalance,
    sendTransaction: handleSendTransaction,
    signMessage: handleSignMessage,
    loading,
    error,
  }

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>
}
