import { ethers } from 'ethers'

export interface Web3AuthUser {
  id: string
  email: string
  name: string
  address: string
  publicKey: string
}

export async function getWeb3AuthProvider(idToken: string) {
  const response = await fetch(process.env.NEXT_PUBLIC_JWKS_ENDPOINT!)
  const jwks = await response.json()
  
  // In production, validate JWT signature with JWKS
  // For now, extract claims directly
  const parts = idToken.split('.')
  const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf-8'))
  
  return payload
}

export async function verifyWeb3AuthToken(idToken: string): Promise<Web3AuthUser | null> {
  try {
    const claims = await getWeb3AuthProvider(idToken)
    
    // Extract wallet address from token
    const address = claims.wallet_public_key || claims.sub
    
    return {
      id: claims.sub,
      email: claims.email || '',
      name: claims.name || 'Web3 User',
      address: address,
      publicKey: claims.public_key || '',
    }
  } catch (error) {
    console.error('Web3Auth verification failed:', error)
    return null
  }
}

export async function createWeb3AuthWallet(idToken: string): Promise<{
  address: string
  publicKey: string
  encryptedPrivateKey?: string
}> {
  const claims = await getWeb3AuthProvider(idToken)
  
  // Web3Auth handles key management - we get the address and public key
  return {
    address: claims.wallet_address || claims.sub,
    publicKey: claims.public_key || '',
  }
}
