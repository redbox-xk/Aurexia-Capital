'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AlertCircle, Loader2, Copy, Eye, EyeOff } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { createNewWallet, importWalletFromPrivateKey } from '@/lib/web3/wallet'
import { NETWORKS } from '@/lib/web3/config'

interface CreateWalletWeb3Props {
  onSuccess?: (wallet: any) => void
}

export function CreateWalletWeb3({ onSuccess }: CreateWalletWeb3Props) {
  const [step, setStep] = useState<'method' | 'create' | 'import' | 'confirm'>('method')
  const [wallet, setWallet] = useState<any>(null)
  const [importKey, setImportKey] = useState('')
  const [walletName, setWalletName] = useState('')
  const [network, setNetwork] = useState<string>('ethereum')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const handleCreateNew = async () => {
    setLoading(true)
    setError(null)
    try {
      const newWallet = await createNewWallet()
      setWallet(newWallet)
      setStep('confirm')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create wallet')
    } finally {
      setLoading(false)
    }
  }

  const handleImport = async () => {
    setLoading(true)
    setError(null)
    try {
      const importedWallet = await importWalletFromPrivateKey(importKey)
      setWallet(importedWallet)
      setStep('confirm')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import wallet')
    } finally {
      setLoading(false)
    }
  }

  const handleConfirm = () => {
    if (!walletName.trim()) {
      setError('Please enter a wallet name')
      return
    }

    if (onSuccess) {
      onSuccess({
        ...wallet,
        name: walletName,
        network,
      })
    }
  }

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  if (step === 'method') {
    return (
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create or Import Wallet</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={() => setStep('create')} className="w-full h-12" variant="outline">
            Create New Wallet
          </Button>
          <Button onClick={() => setStep('import')} className="w-full h-12" variant="outline">
            Import Existing Wallet
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (step === 'create') {
    return (
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create New Wallet</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              A new Ethereum wallet will be generated. Save your private key in a secure location.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <label className="text-sm font-medium">Wallet Name</label>
            <Input
              placeholder="My First Wallet"
              value={walletName}
              onChange={(e) => setWalletName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Network</label>
            <select
              className="w-full px-3 py-2 border rounded-lg"
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
            >
              {Object.entries(NETWORKS).map(([key, net]) => (
                <option key={key} value={key}>
                  {net.name}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2">
            <Button
              onClick={() => setStep('method')}
              variant="outline"
              className="flex-1"
              disabled={loading}
            >
              Back
            </Button>
            <Button onClick={handleCreateNew} className="flex-1" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Create Wallet
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (step === 'import') {
    return (
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Import Wallet</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Enter your private key (0x...). Never share this key with anyone.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <label className="text-sm font-medium">Wallet Name</label>
            <Input
              placeholder="Imported Wallet"
              value={walletName}
              onChange={(e) => setWalletName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Private Key</label>
            <div className="relative">
              <textarea
                className="w-full px-3 py-2 border rounded-lg font-mono text-sm"
                placeholder="0x..."
                value={importKey}
                onChange={(e) => setImportKey(e.target.value)}
                rows={4}
              />
              <button
                className="absolute right-2 top-2 p-2 hover:bg-muted rounded"
                onClick={() => setShowPrivateKey(!showPrivateKey)}
              >
                {showPrivateKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Network</label>
            <select
              className="w-full px-3 py-2 border rounded-lg"
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
            >
              {Object.entries(NETWORKS).map(([key, net]) => (
                <option key={key} value={key}>
                  {net.name}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2">
            <Button
              onClick={() => setStep('method')}
              variant="outline"
              className="flex-1"
              disabled={loading}
            >
              Back
            </Button>
            <Button onClick={handleImport} className="flex-1" disabled={loading || !importKey}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Import Wallet
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (step === 'confirm' && wallet) {
    return (
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Confirm Wallet Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="border-success/30 bg-success/5">
            <AlertCircle className="h-4 w-4 text-success" />
            <AlertDescription>
              Save your details below. You'll need your private key to access this wallet.
            </AlertDescription>
          </Alert>

          <div className="space-y-4 bg-muted/50 p-4 rounded-lg">
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Wallet Name</label>
              <p className="text-lg font-medium mt-1">{walletName}</p>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground">Address</label>
              <div className="flex items-center gap-2 mt-1">
                <code className="bg-background px-3 py-2 rounded font-mono text-sm break-all">
                  {wallet.address}
                </code>
                <button
                  onClick={() => copyToClipboard(wallet.address, 'address')}
                  className="p-2 hover:bg-background rounded"
                >
                  <Copy size={16} />
                </button>
              </div>
              {copied === 'address' && <p className="text-xs text-success mt-1">Copied!</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground">Private Key</label>
              <div className="flex items-center gap-2 mt-1">
                <code className="bg-background px-3 py-2 rounded font-mono text-sm break-all">
                  {showPrivateKey
                    ? wallet.privateKey
                    : wallet.privateKey.substring(0, 10) + '...'}
                </code>
                <button
                  onClick={() => setShowPrivateKey(!showPrivateKey)}
                  className="p-2 hover:bg-background rounded"
                >
                  {showPrivateKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button
                  onClick={() => copyToClipboard(wallet.privateKey, 'privateKey')}
                  className="p-2 hover:bg-background rounded"
                >
                  <Copy size={16} />
                </button>
              </div>
              {copied === 'privateKey' && <p className="text-xs text-success mt-1">Copied!</p>}
            </div>

            {wallet.mnemonic && (
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Recovery Phrase</label>
                <p className="text-sm mt-1 p-3 bg-background rounded font-mono">
                  {wallet.mnemonic}
                </p>
                <button
                  onClick={() => copyToClipboard(wallet.mnemonic, 'mnemonic')}
                  className="mt-2 text-sm text-primary hover:underline flex items-center gap-1"
                >
                  <Copy size={14} /> Copy Phrase
                </button>
                {copied === 'mnemonic' && <p className="text-xs text-success mt-1">Copied!</p>}
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-muted-foreground">Network</label>
              <p className="text-sm mt-1 capitalize">{network}</p>
            </div>
          </div>

          <Button onClick={handleConfirm} className="w-full h-12">
            Confirm & Save Wallet
          </Button>
        </CardContent>
      </Card>
    )
  }

  return null
}
