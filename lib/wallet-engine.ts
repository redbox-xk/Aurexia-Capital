import crypto from 'crypto'

// Configuration from Python blockchain
export const WALLET_CONFIG = {
  appName: 'Flash Wallet',
  version: '1.0.0',
  initialBalance: 50.0,
  transactionFee: 0.001,
  miningReward: 10.0,
  maxTxPerBlock: 25,
  difficulty: 3,
}

export interface Wallet {
  id: string
  name: string
  address: string
  balance: number
  created: number
  transactions: Transaction[]
  publicKey?: string
  privateKey?: string
}

export interface Transaction {
  id: string
  sender: string
  recipient: string
  amount: number
  fee: number
  timestamp: number
  status: 'pending' | 'confirmed' | 'failed'
  type: 'sent' | 'received' | 'reward'
}

export interface Block {
  index: number
  timestamp: number
  transactions: Transaction[]
  previousHash: string
  nonce: number
  hash: string
}

/**
 * Lightweight Blockchain Engine
 * Based on Mobile Blockchain architecture for client-side wallet management
 */
export class WalletEngine {
  private wallets: Map<string, Wallet> = new Map()
  private transactions: Transaction[] = []
  private blocks: Block[] = []
  private storageKey = 'flash_wallet_data'

  constructor() {
    this.loadFromStorage()
    if (this.blocks.length === 0) {
      this.createGenesisBlock()
    }
  }

  /**
   * Create a new wallet with unique address
   * Implements wallet creation from Python MobileBlockchain.create_wallet()
   */
  createWallet(name: string = 'My Wallet'): Wallet {
    const id = crypto.randomBytes(4).toString('hex')
    const address = crypto
      .createHash('sha256')
      .update(`${id}${Date.now()}`)
      .digest('hex')
      .slice(0, 16)

    const wallet: Wallet = {
      id,
      name,
      address,
      balance: WALLET_CONFIG.initialBalance,
      created: Date.now(),
      transactions: [],
      publicKey: this.generatePublicKey(address),
      privateKey: this.generatePrivateKey(address),
    }

    this.wallets.set(address, wallet)
    this.saveToStorage()

    return wallet
  }

  /**
   * Get wallet by address
   */
  getWallet(address: string): Wallet | undefined {
    return this.wallets.get(address)
  }

  /**
   * Get all wallets
   */
  getAllWallets(): Wallet[] {
    return Array.from(this.wallets.values())
  }

  /**
   * Create a transaction between wallets
   * Implements create_transaction() from Python
   */
  createTransaction(
    senderAddress: string,
    recipientAddress: string,
    amount: number
  ): Transaction | null {
    const sender = this.getWallet(senderAddress)
    if (!sender) return null

    const totalAmount = amount + WALLET_CONFIG.transactionFee
    if (sender.balance < totalAmount) return null

    const txId = crypto
      .createHash('sha256')
      .update(`${senderAddress}${recipientAddress}${amount}${Date.now()}`)
      .digest('hex')
      .slice(0, 12)

    const transaction: Transaction = {
      id: txId,
      sender: senderAddress,
      recipient: recipientAddress,
      amount,
      fee: WALLET_CONFIG.transactionFee,
      timestamp: Date.now(),
      status: 'pending',
      type: 'sent',
    }

    // Update sender balance
    sender.balance -= totalAmount
    sender.transactions.push(transaction)

    // Add to pending
    this.transactions.push(transaction)
    this.saveToStorage()

    return transaction
  }

  /**
   * Mine a block with pending transactions
   * Implements mine_block() from Python
   */
  mineBlock(minerAddress: string): Block | null {
    if (this.transactions.length === 0) return null

    const previousBlock = this.blocks[this.blocks.length - 1]
    const txs = this.transactions.slice(0, WALLET_CONFIG.maxTxPerBlock)

    // Add mining reward
    const miner = this.getWallet(minerAddress)
    if (miner) {
      const rewardTx: Transaction = {
        id: `reward_${Date.now()}`,
        sender: 'NETWORK',
        recipient: minerAddress,
        amount: WALLET_CONFIG.miningReward,
        fee: 0,
        timestamp: Date.now(),
        status: 'confirmed',
        type: 'reward',
      }
      txs.push(rewardTx)
      miner.balance += WALLET_CONFIG.miningReward
      miner.transactions.push(rewardTx)
    }

    const block: Block = {
      index: this.blocks.length,
      timestamp: Date.now(),
      transactions: txs,
      previousHash: previousBlock.hash,
      nonce: 0,
      hash: '',
    }

    // Proof of work
    block.nonce = this.proofOfWork(block)
    block.hash = this.calculateHash(block)

    // Add to chain
    this.blocks.push(block)

    // Update balances
    this.updateBalances(block)

    // Clear mined transactions
    this.transactions = this.transactions.filter(
      (tx) => !txs.find((t) => t.id === tx.id)
    )

    this.saveToStorage()
    return block
  }

  /**
   * Proof of Work implementation
   */
  private proofOfWork(block: Block): number {
    const target = '0'.repeat(WALLET_CONFIG.difficulty)
    let nonce = 0

    while (true) {
      block.hash = this.calculateHash(block)
      if (block.hash.startsWith(target)) {
        return nonce
      }
      nonce++

      // Timeout for web (5 seconds)
      if (nonce > 100000) break
    }

    return nonce
  }

  /**
   * Calculate SHA256 hash of block
   */
  private calculateHash(block: Block): string {
    let blockString = `${block.index}${block.timestamp}${block.previousHash}${block.nonce}`
    for (const tx of block.transactions) {
      blockString += `${tx.id}${tx.amount}`
    }
    return crypto.createHash('sha256').update(blockString).digest('hex')
  }

  /**
   * Update wallet balances from block
   */
  private updateBalances(block: Block): void {
    for (const tx of block.transactions) {
      if (tx.sender !== 'NETWORK') {
        const recipient = this.getWallet(tx.recipient)
        if (recipient) {
          recipient.balance += tx.amount
          recipient.transactions.push({
            ...tx,
            status: 'confirmed',
            type: 'received',
          })
        }
      }
    }
  }

  /**
   * Validate blockchain integrity
   */
  validateChain(): boolean {
    for (let i = 1; i < this.blocks.length; i++) {
      const current = this.blocks[i]
      const previous = this.blocks[i - 1]

      if (current.hash !== this.calculateHash(current)) return false
      if (current.previousHash !== previous.hash) return false
      if (!current.hash.startsWith('0'.repeat(WALLET_CONFIG.difficulty)))
        return false
    }
    return true
  }

  /**
   * Get blockchain statistics
   */
  getStats() {
    return {
      blocks: this.blocks.length,
      wallets: this.wallets.size,
      pendingTransactions: this.transactions.length,
      totalTransactions: this.blocks.reduce((sum, b) => sum + b.transactions.length, 0),
      difficulty: WALLET_CONFIG.difficulty,
      totalCoins: Array.from(this.wallets.values()).reduce(
        (sum, w) => sum + w.balance,
        0
      ),
    }
  }

  /**
   * Create genesis block
   */
  private createGenesisBlock(): void {
    const genesisBlock: Block = {
      index: 0,
      timestamp: Date.now(),
      transactions: [],
      previousHash: '0'.repeat(64),
      nonce: 0,
      hash: '',
    }
    genesisBlock.hash = this.calculateHash(genesisBlock)
    this.blocks.push(genesisBlock)
  }

  /**
   * Generate public key (simplified)
   */
  private generatePublicKey(seed: string): string {
    return 'pub_' + crypto.createHash('sha256').update(seed).digest('hex').slice(0, 32)
  }

  /**
   * Generate private key (simplified)
   */
  private generatePrivateKey(seed: string): string {
    return 'priv_' + crypto.createHash('sha256').update(seed + 'private').digest('hex').slice(0, 32)
  }

  /**
   * Save all data to local storage
   */
  private saveToStorage(): void {
    const data = {
      wallets: Array.from(this.wallets.values()),
      transactions: this.transactions,
      blocks: this.blocks,
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(data))
    }
  }

  /**
   * Load data from local storage
   */
  private loadFromStorage(): void {
    if (typeof window === 'undefined') return

    const data = localStorage.getItem(this.storageKey)
    if (!data) return

    try {
      const parsed = JSON.parse(data)
      parsed.wallets.forEach((w: Wallet) => this.wallets.set(w.address, w))
      this.transactions = parsed.transactions || []
      this.blocks = parsed.blocks || []
    } catch (e) {
      console.error('Failed to load from storage', e)
    }
  }

  /**
   * Export wallet data
   */
  exportWalletData(): string {
    return JSON.stringify(
      {
        wallets: Array.from(this.wallets.values()),
        transactions: this.transactions,
        blocks: this.blocks,
        exportDate: new Date().toISOString(),
      },
      null,
      2
    )
  }

  /**
   * Clear all data
   */
  clearAllData(): void {
    this.wallets.clear()
    this.transactions = []
    this.blocks = []
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.storageKey)
    }
  }
}

// Export singleton instance
export const walletEngine = new WalletEngine()
