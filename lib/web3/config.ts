// Web3 Network Configuration
export const NETWORKS = {
  ethereum: {
    name: 'Ethereum',
    chainId: 1,
    rpc: process.env.NEXT_PUBLIC_ETH_RPC!,
    ws: 'wss://mainnet.infura.io/ws/v3/' + process.env.NEXT_PUBLIC_INFURA_KEY!,
    nativeCurrency: 'ETH',
    blockExplorer: 'https://etherscan.io',
    decimals: 18,
  },
  polygon: {
    name: 'Polygon',
    chainId: 137,
    rpc: process.env.NEXT_PUBLIC_POLYGON_RPC!,
    ws: 'wss://polygon-mainnet.infura.io/ws/v3/' + process.env.NEXT_PUBLIC_INFURA_KEY!,
    nativeCurrency: 'MATIC',
    blockExplorer: 'https://polygonscan.com',
    decimals: 18,
  },
  optimism: {
    name: 'Optimism',
    chainId: 10,
    rpc: process.env.NEXT_PUBLIC_OPTIMISM_RPC!,
    ws: 'wss://optimism-mainnet.infura.io/ws/v3/' + process.env.NEXT_PUBLIC_INFURA_KEY!,
    nativeCurrency: 'ETH',
    blockExplorer: 'https://optimistic.etherscan.io',
    decimals: 18,
  },
  arbitrum: {
    name: 'Arbitrum',
    chainId: 42161,
    rpc: process.env.NEXT_PUBLIC_ARBITRUM_RPC!,
    ws: 'wss://arbitrum-mainnet.infura.io/ws/v3/' + process.env.NEXT_PUBLIC_INFURA_KEY!,
    nativeCurrency: 'ETH',
    blockExplorer: 'https://arbiscan.io',
    decimals: 18,
  },
} as const

export const DEFAULT_NETWORK = 'ethereum' as const
export const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY!
export const WEB3AUTH_CLIENT_ID = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!
export const JWKS_ENDPOINT = process.env.NEXT_PUBLIC_JWKS_ENDPOINT!

export type NetworkKey = keyof typeof NETWORKS
export type Network = typeof NETWORKS[NetworkKey]
