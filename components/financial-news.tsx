'use client'

import { useEffect, useState } from 'react'
import { getFinancialNews, StockNews } from '@/lib/services/stock-service'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export function FinancialNews() {
  const [news, setNews] = useState<StockNews[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getFinancialNews()
      setNews(data)
      setIsLoading(false)
    }

    fetchNews()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded w-3/4 mb-2" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-playfair font-semibold">Market News</h3>
      </div>

      {news.map((article, idx) => (
        <Card key={idx} className="hover:shadow-lg transition overflow-hidden">
          <CardContent className="p-6">
            <div className="flex gap-4">
              {article.image && (
                <div className="hidden sm:block flex-shrink-0 w-24 h-24 rounded overflow-hidden bg-muted">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h4 className="font-semibold leading-tight">{article.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {article.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium">{article.source}</span>
                    <span>•</span>
                    <span>{formatTimeAgo(article.publishedAt)}</span>
                  </div>
                  <Link href={article.url} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="ghost" className="gap-2">
                      Read <ExternalLink className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}
