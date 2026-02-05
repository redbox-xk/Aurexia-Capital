'use client'

import { useState, useCallback } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, Star } from 'lucide-react'
import { WalletDisplay } from './wallet-display'
import { CreateWalletWeb3 } from './create-wallet-web3'
import { createWallet, deleteWallet, updateWallet } from '@/app/dashboard/actions'

interface Wallet {
  id: string
  address: string
  balance: string
  name: string
  network: string
  is_primary: boolean
  public_key: string
}

interface WalletsManagerWeb3Props {
  wallets: Wallet[]
  userId: string
}

export function WalletsManagerWeb3({ wallets: initialWallets, userId }: WalletsManagerWeb3Props) {
  const [wallets, setWallets] = useState<Wallet[]>(initialWallets)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreateWallet = useCallback(
    async (walletData: any) => {
      setLoading(true)
      setError(null)
      try {
        const result = await createWallet(walletData.name, walletData.network)
        
        if (result.error) {
          setError(result.error)
          return
        }

        if (result.wallet) {
          setWallets((prev) => [result.wallet, ...prev])
        }

        setShowCreateDialog(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to create wallet')
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const handleSetPrimary = useCallback(async (walletId: string) => {
    setError(null)
    try {
      const result = await updateWallet(walletId, { is_primary: true })
      
      if (result.error) {
        setError(result.error)
        return
      }

      setWallets((prev) =>
        prev.map((w) => ({
          ...w,
          is_primary: w.id === walletId,
        }))
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update wallet')
    }
  }, [])

  const handleDelete = useCallback(async (walletId: string) => {
    if (!confirm('Are you sure you want to delete this wallet? This action cannot be undone.')) {
      return
    }

    setError(null)
    try {
      const result = await deleteWallet(walletId)
      
      if (result.error) {
        setError(result.error)
        return
      }

      setWallets((prev) => prev.filter((w) => w.id !== walletId))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete wallet')
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Your Wallets</h1>
          <p className="text-muted-foreground mt-2">
            Manage your crypto wallets on multiple blockchains
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="gap-2" size="lg">
          <Plus size={18} />
          Create Wallet
        </Button>
      </div>

      {error && (
        <Card className="bg-destructive/10 border-destructive/30 p-4">
          <p className="text-sm text-destructive">{error}</p>
        </Card>
      )}

      {showCreateDialog ? (
        <div className="space-y-4">
          <CreateWalletWeb3
            onSuccess={(wallet) => {
              handleCreateWallet(wallet)
            }}
          />
        </div>
      ) : (
        <>
          {wallets.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground mb-4">No wallets yet</p>
              <Button onClick={() => setShowCreateDialog(true)} className="gap-2">
                <Plus size={16} />
                Create Your First Wallet
              </Button>
            </Card>
          ) : (
            <div className="grid gap-4">
              {wallets.map((wallet) => (
                <div key={wallet.id} className="relative group">
                  <WalletDisplay
                    address={wallet.address}
                    balance={wallet.balance}
                    network={wallet.network}
                    name={wallet.name}
                  />

                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!wallet.is_primary && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleSetPrimary(wallet.id)}
                        title="Set as primary"
                      >
                        <Star size={16} />
                      </Button>
                    )}
                    {wallets.length > 1 && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(wallet.id)}
                        title="Delete wallet"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>

                  {wallet.is_primary && (
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                      Primary
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
