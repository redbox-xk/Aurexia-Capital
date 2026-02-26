'use client'

import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { Button } from './ui/button'

export function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: balance } = useBalance({
    address,
    token: process.env.NEXT_PUBLIC_OPM_TOKEN_ADDRESS as `0x${string}`,
  })

  if (isConnected) {
    return (
      <div className="flex items-center gap-4">
        <div className="text-sm">
          <div className="font-medium">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </div>
          <div className="text-muted-foreground">
            {balance?.formatted} {balance?.symbol}
          </div>
        </div>
        <Button variant="outline" onClick={() => disconnect()}>
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <Button variant="gold" onClick={() => connect({ connector: connectors[0] })}>
      Connect Wallet
    </Button>
  )
}
