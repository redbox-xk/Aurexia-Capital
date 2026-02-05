'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, Download } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { formatAddress, getExplorerUrl } from '@/lib/web3/wallet'
import { NETWORKS } from '@/lib/web3/config'

interface ReceiveWeb3Props {
  address: string
  network: string
  walletName: string
}

export function ReceiveWeb3({ address, network, walletName }: ReceiveWeb3Props) {
  const [copied, setCopied] = useState<string | null>(null)
  const net = NETWORKS[network as keyof typeof NETWORKS]

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const generateQRCode = async () => {
    // In a real app, generate QR code using a library like qrcode.react
    const qrData = `ethereum:${address}`
    window.open(`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(qrData)}`)
  }

  return (
    <div className="w-full max-w-2xl space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Receive {net?.nativeCurrency}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="border-success/30 bg-success/5">
            <AlertDescription>
              Share your address with others to receive {net?.nativeCurrency} on {net?.name}
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <label className="text-sm font-medium">Wallet Name</label>
            <p className="text-lg font-semibold">{walletName}</p>
          </div>

          <div className="space-y-3 bg-muted/50 p-4 rounded-lg">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                Your Address
              </label>
              <div className="flex items-center gap-2">
                <code className="bg-background px-4 py-3 rounded-lg font-mono text-sm flex-1 break-all">
                  {address}
                </code>
                <button
                  onClick={() => copyToClipboard(address, 'address')}
                  className="p-3 hover:bg-background rounded-lg transition-colors flex-shrink-0"
                  title="Copy address"
                >
                  <Copy size={18} />
                </button>
              </div>
              {copied === 'address' && (
                <p className="text-xs text-success mt-2 font-medium">✓ Copied to clipboard</p>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                Short Address
              </label>
              <div className="flex items-center gap-2">
                <code className="bg-background px-4 py-3 rounded-lg font-mono text-sm flex-1">
                  {formatAddress(address)}
                </code>
                <button
                  onClick={() => copyToClipboard(formatAddress(address), 'short')}
                  className="p-3 hover:bg-background rounded-lg transition-colors flex-shrink-0"
                  title="Copy short address"
                >
                  <Copy size={18} />
                </button>
              </div>
              {copied === 'short' && (
                <p className="text-xs text-success mt-2 font-medium">✓ Copied to clipboard</p>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-3 block">QR Code</label>
            <div className="bg-muted/50 p-6 rounded-lg flex flex-col items-center gap-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Scan this QR code to share your wallet address
                </p>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
                    `ethereum:${address}`
                  )}`}
                  alt="Wallet QR Code"
                  className="w-64 h-64 rounded-lg"
                />
              </div>
              <Button variant="outline" onClick={generateQRCode} className="gap-2 bg-transparent">
                <Download size={16} />
                Download QR Code
              </Button>
            </div>
          </div>

          <div className="space-y-3 bg-primary/5 border border-primary/20 p-4 rounded-lg">
            <p className="text-sm font-semibold text-foreground">Important:</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>This address is safe to share with anyone</li>
              <li>Only {net?.nativeCurrency} can be sent to this address</li>
              <li>Never share your private key with anyone</li>
              <li>Always verify addresses before sending funds</li>
            </ul>
          </div>

          <a
            href={getExplorerUrl(address, network as any)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button variant="outline" className="gap-2 w-full bg-transparent">
              View on {net?.blockExplorer?.split('/').pop()?.split('.')[0] || 'Explorer'}
            </Button>
          </a>
        </CardContent>
      </Card>
    </div>
  )
}
