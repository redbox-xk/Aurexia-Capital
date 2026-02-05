'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, ExternalLink, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { NETWORKS } from '@/lib/web3/config'
import { formatAddress, getExplorerUrl } from '@/lib/web3/wallet'

interface WalletDisplayProps {
  address: string
  balance: string
  network: string
  name: string
  onShowPrivateKey?: () => void
}

export function WalletDisplay({
  address,
  balance,
  network,
  name,
  onShowPrivateKey,
}: WalletDisplayProps) {
  const [copied, setCopied] = useState(false)
  const net = NETWORKS[network as keyof typeof NETWORKS]

  const copyAddress = async () => {
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="w-full bg-gradient-to-br from-primary/5 to-transparent border-primary/20 hover:border-primary/40 transition-all">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {net?.name || network}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">
              {balance}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {net?.nativeCurrency || 'ETH'}
            </p>
          </div>
        </div>

        <div className="space-y-3 bg-muted/50 p-3 rounded-lg mb-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1 font-medium">Address</p>
            <div className="flex items-center gap-2">
              <code className="text-sm font-mono bg-background px-2 py-1 rounded flex-1 overflow-hidden text-ellipsis">
                {formatAddress(address)}
              </code>
              <button
                onClick={copyAddress}
                className="p-2 hover:bg-background rounded transition-colors"
                title={copied ? 'Copied!' : 'Copy address'}
              >
                <Copy size={16} className={copied ? 'text-success' : ''} />
              </button>
              <a
                href={getExplorerUrl(address, network as any)}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-background rounded transition-colors"
                title="View on explorer"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 text-sm bg-transparent">
            Send
          </Button>
          <Button variant="outline" className="flex-1 text-sm bg-transparent">
            Receive
          </Button>
          {onShowPrivateKey && (
            <Button variant="ghost" size="sm" onClick={onShowPrivateKey}>
              <Eye size={16} />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
