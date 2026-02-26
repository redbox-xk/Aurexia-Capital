export interface Document {
  id: string
  title: string
  description?: string
  category: 'report' | 'strategy' | 'research' | 'compliance' | 'other'
  filename: string
  filesize: number
  uploadedAt: Date
  accessLevel: 'public' | 'private' | 'restricted'
  tags?: string[]
}

// Mock document library
export const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Q3 2024 Performance Report',
    description: 'Comprehensive quarterly performance review with detailed portfolio analysis',
    category: 'report',
    filename: 'Q3-2024-Performance-Report.pdf',
    filesize: 2457600,
    uploadedAt: new Date('2024-10-15'),
    accessLevel: 'private',
    tags: ['quarterly', 'performance', '2024'],
  },
  {
    id: '2',
    title: 'Portfolio Strategy Document',
    description: 'Long-term investment strategy and asset allocation framework',
    category: 'strategy',
    filename: 'Portfolio-Strategy-2024.pdf',
    filesize: 1843200,
    uploadedAt: new Date('2024-09-20'),
    accessLevel: 'private',
    tags: ['strategy', 'portfolio', 'allocation'],
  },
  {
    id: '3',
    title: 'Risk Assessment & Analysis',
    description: 'Detailed risk profiling and mitigation strategies',
    category: 'research',
    filename: 'Risk-Assessment-Analysis.pdf',
    filesize: 3153920,
    uploadedAt: new Date('2024-08-30'),
    accessLevel: 'private',
    tags: ['risk', 'assessment', 'mitigation'],
  },
  {
    id: '4',
    title: 'Annual Compliance Statement',
    description: 'Regulatory compliance and governance documentation',
    category: 'compliance',
    filename: 'Annual-Compliance-Statement.pdf',
    filesize: 914432,
    uploadedAt: new Date('2024-07-10'),
    accessLevel: 'private',
    tags: ['compliance', 'regulatory', 'governance'],
  },
  {
    id: '5',
    title: 'Market Analysis - Southeast Europe',
    description: 'Regional economic outlook and investment opportunities',
    category: 'research',
    filename: 'Market-Analysis-SE-Europe.pdf',
    filesize: 2867200,
    uploadedAt: new Date('2024-10-01'),
    accessLevel: 'public',
    tags: ['market', 'regional', 'analysis'],
  },
  {
    id: '6',
    title: 'Fixed Income Strategy',
    description: 'Bond market analysis and tactical positioning',
    category: 'strategy',
    filename: 'Fixed-Income-Strategy.pdf',
    filesize: 1945600,
    uploadedAt: new Date('2024-09-15'),
    accessLevel: 'public',
    tags: ['bonds', 'fixed-income', 'strategy'],
  },
]

export function getDocuments(
  filter?: {
    category?: string
    accessLevel?: 'public' | 'private' | 'restricted'
  }
): Document[] {
  let docs = [...mockDocuments]

  if (filter?.category) {
    docs = docs.filter((d) => d.category === filter.category)
  }

  if (filter?.accessLevel) {
    docs = docs.filter((d) => d.accessLevel === filter.accessLevel)
  }

  return docs.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())
}

export function getDocumentById(id: string): Document | undefined {
  return mockDocuments.find((d) => d.id === id)
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}
