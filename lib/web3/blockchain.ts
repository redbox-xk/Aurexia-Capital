import { ethers } from 'ethers'
import { NETWORKS, NetworkKey } from './config'

export async function getBalance(
  address: string,
  networkKey: NetworkKey = 'ethereum'
): Promise<{ balance: string; formatted: string }> {
  const network = NETWORKS[networkKey]
  const provider = new ethers.JsonRpcProvider(network.rpc)
  
  const balance = await provider.getBalance(address)
  const formatted = ethers.formatUnits(balance, network.decimals)
  
  return {
    balance: balance.toString(),
    formatted: parseFloat(formatted).toFixed(6),
  }
}

export async function getGasPrice(networkKey: NetworkKey = 'ethereum'): Promise<{
  standard: string
  fast: string
  fastest: string
}> {
  const network = NETWORKS[networkKey]
  const provider = new ethers.JsonRpcProvider(network.rpc)
  
  const feeData = await provider.getFeeData()
  const standard = ethers.formatUnits(feeData.gasPrice || 0, 'gwei')
  const fast = ethers.formatUnits((feeData.gasPrice || BigInt(0)) * BigInt(12) / BigInt(10), 'gwei')
  const fastest = ethers.formatUnits((feeData.gasPrice || BigInt(0)) * BigInt(15) / BigInt(10), 'gwei')
  
  return {
    standard: parseFloat(standard).toFixed(2),
    fast: parseFloat(fast).toFixed(2),
    fastest: parseFloat(fastest).toFixed(2),
  }
}

export async function getTransactionHistory(
  address: string,
  networkKey: NetworkKey = 'ethereum'
): Promise<Array<{
  hash: string
  from: string
  to: string | null
  value: string
  timestamp: number
  status: 'success' | 'failed'
}>> {
  // This would require Etherscan API or The Graph in production
  // For now, return empty array
  return []
}

export async function validateAddress(address: string): Promise<boolean> {
  return ethers.isAddress(address)
}

export function formatAddress(address: string): string {
  return address.slice(0, 6) + '...' + address.slice(-4)
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

export async function getNetworkInfo(networkKey: NetworkKey) {
  const network = NETWORKS[networkKey]
  const provider = new ethers.JsonRpcProvider(network.rpc)
  
  const blockNumber = await provider.getBlockNumber()
  const feeData = await provider.getFeeData()
  
  return {
    name: network.name,
    chainId: network.chainId,
    blockNumber,
    gasPrice: ethers.formatUnits(feeData.gasPrice || 0, 'gwei'),
  }
}
