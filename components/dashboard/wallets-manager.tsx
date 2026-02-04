"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Wallet } from "@/lib/types"
import { formatCurrency, truncateAddress } from "@/lib/wallet-utils"
import { createWallet, updateWallet, deleteWallet } from "@/app/dashboard/actions"
import { 
  Wallet as WalletIcon, 
  Plus,
  MoreVertical,
  Star,
  Trash2,
  Copy,
  Check,
  Loader2
} from "lucide-react"

interface WalletsManagerProps {
  wallets: Wallet[]
}

export function WalletsManager({ wallets }: WalletsManagerProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [newWalletName, setNewWalletName] = useState("")
  const [loading, setLoading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const router = useRouter()

  const handleCreateWallet = async () => {
    if (!newWalletName.trim()) return
    setLoading(true)
    
    const result = await createWallet(newWalletName.trim())
    
    if (!result.error) {
      setNewWalletName("")
      setDialogOpen(false)
      router.refresh()
    }
    
    setLoading(false)
  }

  const handleSetPrimary = async (walletId: string) => {
    await updateWallet(walletId, { is_primary: true })
    router.refresh()
  }

  const handleDeleteWallet = async (walletId: string) => {
    await deleteWallet(walletId)
    router.refresh()
  }

  const copyAddress = (address: string, walletId: string) => {
    navigator.clipboard.writeText(address)
    setCopiedId(walletId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Logo size="sm" showText={false} />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Wallets</h1>
            <p className="text-muted-foreground">Manage your Flash Wallet accounts</p>
          </div>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Wallet
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Wallet</DialogTitle>
              <DialogDescription>
                Add a new wallet to your Flash Wallet account
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="walletName">Wallet Name</Label>
                <Input
                  id="walletName"
                  placeholder="e.g., Savings, Trading, Personal"
                  value={newWalletName}
                  onChange={(e) => setNewWalletName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleCreateWallet()
                  }}
                />
              </div>
              <Button onClick={handleCreateWallet} className="w-full" disabled={loading || !newWalletName.trim()}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Wallet
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Wallets Grid */}
      {wallets.length === 0 ? (
        <Card className="bg-card border-border">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <WalletIcon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No wallets yet</h3>
            <p className="text-muted-foreground mb-6 text-center max-w-sm">
              Create your first wallet to start managing your digital assets with Flash Wallet
            </p>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Wallet
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wallets.map((wallet) => (
            <Card key={wallet.id} className="bg-card border-border hover:border-primary/30 transition-colors">
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <WalletIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{wallet.name}</CardTitle>
                      {wallet.is_primary && (
                        <Badge variant="secondary" className="text-xs">
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          Primary
                        </Badge>
                      )}
                    </div>
                    <CardDescription>Created {new Date(wallet.created_at).toLocaleDateString()}</CardDescription>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => copyAddress(wallet.address, wallet.id)}>
                      {copiedId === wallet.id ? (
                        <Check className="w-4 h-4 mr-2 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 mr-2" />
                      )}
                      Copy Address
                    </DropdownMenuItem>
                    {!wallet.is_primary && (
                      <DropdownMenuItem onClick={() => handleSetPrimary(wallet.id)}>
                        <Star className="w-4 h-4 mr-2" />
                        Set as Primary
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem 
                          className="text-destructive"
                          onSelect={(e) => e.preventDefault()}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Wallet
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Wallet</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete &quot;{wallet.name}&quot;? This action cannot be undone and all associated transactions will be lost.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteWallet(wallet.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Balance</p>
                    <p className="text-2xl font-bold text-foreground">
                      {formatCurrency(wallet.balance, wallet.currency)}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Address</p>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-muted px-2 py-1 rounded font-mono text-foreground">
                        {truncateAddress(wallet.address, 8)}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => copyAddress(wallet.address, wallet.id)}
                      >
                        {copiedId === wallet.id ? (
                          <Check className="w-3 h-3 text-green-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
