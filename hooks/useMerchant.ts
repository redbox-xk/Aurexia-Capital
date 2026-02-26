import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'

interface MerchantData {
  id: string
  name: string
  email: string
  totalVolume: number
  transactionCount: number
  tier: string
}

export function useMerchant() {
  const { address } = useAccount()
  const [data, setData] = useState<MerchantData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (address) {
      fetchMerchantData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  const fetchMerchantData = async () => {
    try {
      const response = await fetch(`/api/merchants/${address}`)
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Error fetching merchant data:', error)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, refresh: fetchMerchantData }
}
