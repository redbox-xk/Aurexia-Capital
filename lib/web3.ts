import { ethers } from 'ethers'
import { OPM_TOKEN_ADDRESS } from '@/constants'

export const OPM_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address) view returns (uint256)',
  'function transfer(address to, uint amount) returns (bool)',
  'function mint(address to, uint256 amount)',
  'function burn(uint256 amount)',
  'function pause()',
  'function unpause()',
  'function isLocked(address) view returns (bool)',
  'function getLockEndTime(address) view returns (uint256)',
]

export async function getProvider() {
  if (typeof window === 'undefined') return null

  const ethereum = (window as Window & { ethereum?: unknown }).ethereum
  if (!ethereum) {
    throw new Error('No Web3 provider found')
  }

  return new ethers.BrowserProvider(ethereum as ethers.Eip1193Provider)
}

export async function getContract(signer?: ethers.Signer) {
  const provider = await getProvider()
  if (!provider) return null

  const contractSigner = signer || provider
  return new ethers.Contract(OPM_TOKEN_ADDRESS, OPM_ABI, contractSigner)
}

export async function getBalance(address: string) {
  const contract = await getContract()
  if (!contract) return '0'

  const balance = await contract.balanceOf(address)
  return ethers.formatEther(balance)
}

export async function checkLockStatus(address: string) {
  const contract = await getContract()
  if (!contract) return { isLocked: false, endTime: null }

  const isLocked = await contract.isLocked(address)
  const endTime = await contract.getLockEndTime(address)

  return {
    isLocked,
    endTime: new Date(Number(endTime) * 1000).toISOString(),
  }
}
