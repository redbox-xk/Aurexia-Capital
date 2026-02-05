import { ethers } from 'ethers'
import { NETWORKS, NetworkKey } from './config'

export interface WalletAccount {
  address: string
  privateKey: string
  publicKey: string
  mnemonic?: string
}

export async function createNewWallet(): Promise<WalletAccount> {
  const wallet = ethers.Wallet.createRandom()
  
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    publicKey: wallet.publicKey,
    mnemonic: wallet.mnemonic?.phrase,
  }
}

export async function importWalletFromPrivateKey(privateKey: string): Promise<WalletAccount> {
  try {
    const wallet = new ethers.Wallet(privateKey)
    
    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
      publicKey: wallet.publicKey,
    }
  } catch (error) {
    throw new Error('Invalid private key')
  }
}

export async function importWalletFromMnemonic(mnemonic: string, path?: string): Promise<WalletAccount> {
  try {
    const hdNode = ethers.HDNodeWallet.fromMnemonic(
      ethers.Mnemonic.fromPhrase(mnemonic),
      path || "m/44'/60'/0'/0/0"
    )
    const wallet = new ethers.Wallet(hdNode.privateKey)
    
    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
      publicKey: wallet.publicKey,
      mnemonic: mnemonic,
    }
  } catch (error) {
    throw new Error('Invalid mnemonic')
  }
}

export async function signMessage(
  privateKey: string,
  message: string
): Promise<string> {
  const wallet = new ethers.Wallet(privateKey)
  return await wallet.signMessage(message)
}

export async function sendTransaction(
  privateKey: string,
  to: string,
  amount: string,
  networkKey: NetworkKey = 'ethereum'
): Promise<{
  hash: string
  from: string
  to: string
  value: string
  status: 'pending' | 'confirmed'
}> {
  const network = NETWORKS[networkKey]
  const provider = new ethers.JsonRpcProvider(network.rpc)
  const wallet = new ethers.Wallet(privateKey, provider)
  
  try {
    const tx = await wallet.sendTransaction({
      to,
      value: ethers.parseUnits(amount, network.decimals),
    })
    
    return {
      hash: tx.hash,
      from: tx.from!,
      to: tx.to!,
      value: amount,
      status: 'pending',
    }
  } catch (error) {
    throw new Error(`Failed to send transaction: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export async function getAccountDetails(
  address: string,
  networkKey: NetworkKey = 'ethereum'
): Promise<{
  address: string
  balance: string
  balanceFormatted: string
  network: string
  isValid: boolean
}> {
  const isValid = ethers.isAddress(address)
  
  if (!isValid) {
    throw new Error('Invalid address')
  }
  
  const network = NETWORKS[networkKey]
  const provider = new ethers.JsonRpcProvider(network.rpc)
  
  const balance = await provider.getBalance(address)
  const formatted = ethers.formatUnits(balance, network.decimals)
  
  return {
    address: address.toLowerCase(),
    balance: balance.toString(),
    balanceFormatted: parseFloat(formatted).toFixed(6),
    network: network.name,
    isValid: true,
  }
}

export function deriveAddressFromPrivateKey(privateKey: string): string {
  const wallet = new ethers.Wallet(privateKey)
  return wallet.address
}

export function getExplorerUrl(
  address: string,
  networkKey: NetworkKey = 'ethereum'
): string {
  const network = NETWORKS[networkKey]
  return `${network.blockExplorer}/address/${address}`
}

export function getTransactionUrl(
  hash: string,
  networkKey: NetworkKey = 'ethereum'
): string {
  const network = NETWORKS[networkKey]
  return `${network.blockExplorer}/tx/${hash}`
}

export function formatAddress(address: string): string {
  if (!address || address.length < 10) return address
  return address.slice(0, 6) + '...' + address.slice(-4)
}

export async function validateAddress(address: string): Promise<boolean> {
  return ethers.isAddress(address)
}

export async function estimateGasTransfer(
  from: string,
  to: string,
  amount: string,
  networkKey: NetworkKey = 'ethereum'
): Promise<string> {
  const network = NETWORKS[networkKey]
  const provider = new ethers.JsonRpcProvider(network.rpc)
  
  try {
    const gasEstimate = await provider.estimateGas({
      from,
      to,
      value: ethers.parseUnits(amount, network.decimals),
    })
    
    const gasPrice = await provider.getGasPrice()
    const gasCost = gasEstimate * gasPrice
    
    return ethers.formatUnits(gasCost, network.decimals)
  } catch {
    return '0'
  }
}
