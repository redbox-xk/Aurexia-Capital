'use client'

import { useAuth } from '@/lib/auth/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Download, Filter, LogOut, Search } from 'lucide-react'
import { getDocuments, formatFileSize, Document } from '@/lib/documents'

export default function DocumentsPage() {
  const { user, logout, isAuthenticated } = useAuth()
  const router = useRouter()
  const [documents, setDocuments] = useState<Document[]>([])
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    const docs = getDocuments()
    setDocuments(docs)
    filterDocuments(docs, selectedCategory, searchQuery)
  }, [])

  const filterDocuments = (docs: Document[], category: string, search: string) => {
    let filtered = docs

    if (category !== 'all') {
      filtered = filtered.filter((d) => d.category === category)
    }

    if (search) {
      const q = search.toLowerCase()
      filtered = filtered.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.description?.toLowerCase().includes(q) ||
          d.tags?.some((t) => t.toLowerCase().includes(q))
      )
    }

    setFilteredDocuments(filtered)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    filterDocuments(documents, category, searchQuery)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    filterDocuments(documents, selectedCategory, query)
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const handleDownload = async (docId: string, title: string) => {
    try {
      const response = await fetch(`/api/documents/${docId}/download`)
      const data = await response.json()
      if (data.success) {
        // In production, this would trigger actual file download
        console.log(`Downloading: ${title}`)
      }
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  if (!user) return null

  const categories = ['all', 'report', 'strategy', 'research', 'compliance']

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/50 to-transparent">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-playfair font-bold">A</span>
            </div>
            <div>
              <h1 className="font-playfair font-semibold hidden sm:block">Aurexia Capital</h1>
              <p className="text-xs text-muted-foreground">Documents & Research</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">{user.name}</span>
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-playfair font-bold mb-2">Documents & Research</h2>
          <p className="text-muted-foreground">
            Access your portfolio reports, research analysis, and compliance documents
          </p>
        </div>

        {/* Search & Filter */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="flex gap-2">
            <Filter className="w-5 h-5 text-muted-foreground self-center" />
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="flex-1 px-4 py-2.5 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="space-y-4">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((doc) => (
              <Card key={doc.id} className="hover:border-primary/30 transition">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold truncate hover:text-primary transition">
                            {doc.title}
                          </h3>
                          {doc.description && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {doc.description}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-2 mt-3">
                            <span className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">
                              {doc.category}
                            </span>
                            {doc.tags?.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs border border-border px-2 py-1 rounded text-muted-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3 flex-shrink-0">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(doc.filesize)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {doc.uploadedAt.toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(doc.id, doc.title)}
                        className="gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-dashed">
              <CardContent className="p-12 text-center">
                <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">No documents found</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Stats Footer */}
        <div className="mt-12 p-6 bg-muted/30 rounded border border-border/50">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold">{filteredDocuments.length}</span> of{' '}
            <span className="font-semibold">{documents.length}</span> documents
          </p>
        </div>
      </main>
    </div>
  )
}
