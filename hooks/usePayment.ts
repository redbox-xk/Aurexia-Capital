import { useState } from 'react'
import { useWriteContract } from 'wagmi'
import { parseEther } from 'viem'
import { OPM_TOKEN_ADDRESS } from '@/constants'

const OPM_ABI = [
  {
    type: 'function',
    stateMutability: 'nonpayable',
    name: 'transfer',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
] as const

export function usePayment() {
  const [loading, setLoading] = useState(false)
  const { writeContractAsync } = useWriteContract()

  const sendPayment = async (to: string, amount: string) => {
    setLoading(true)
    try {
      const result = await writeContractAsync({
        address: OPM_TOKEN_ADDRESS,
        abi: OPM_ABI,
        functionName: 'transfer',
        args: [to as `0x${string}`, parseEther(amount)],
      })
      return result
    } catch (error) {
      console.error('Payment error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { sendPayment, loading }
}
