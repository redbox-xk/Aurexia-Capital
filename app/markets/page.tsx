'use client'

import { Navigation } from '@/components/nav'
import { Footer } from '@/components/footer'
import { FinancialNews } from '@/components/financial-news'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getStockTicker, StockData } from '@/lib/services/stock-service'
import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, Globe, BarChart3 } from 'lucide-react'

export default function MarketsPage() {
  const [stocks, setStocks] = useState<StockData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStocks = async () => {
      const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'JPM']
      const data = await getStockTicker(symbols)
      setStocks(data)
      setIsLoading(false)
    }

    fetchStocks()
  }, [])

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-muted/50 to-transparent">
        {/* Header */}
        <section className="pt-24 pb-12 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-playfair font-bold">Global Markets</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Real-time market data, financial news, and investment insights to keep you informed.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Stocks Grid */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl font-playfair font-semibold">Major Stocks</h2>
                </div>

                {isLoading ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {[...Array(8)].map((_, i) => (
                      <Card key={i} className="animate-pulse">
                        <CardContent className="p-6">
                          <div className="h-6 bg-muted rounded w-2/3 mb-4" />
                          <div className="h-4 bg-muted rounded w-1/2" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {stocks.map((stock) => (
                      <Card
                        key={stock.symbol}
                        className="hover:shadow-lg transition cursor-pointer group"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">
                                {stock.name}
                              </p>
                              <h3 className="text-2xl font-bold font-playfair">
                                ${stock.price.toFixed(2)}
                              </h3>
                            </div>
                            <div
                              className={`flex items-center justify-center w-12 h-12 rounded-lg ${
                                stock.change >= 0
                                  ? 'bg-green-500/10'
                                  : 'bg-red-500/10'
                              }`}
                            >
                              {stock.change >= 0 ? (
                                <TrendingUp className="w-6 h-6 text-green-600" />
                              ) : (
                                <TrendingDown className="w-6 h-6 text-red-600" />
                              )}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">
                                Change
                              </span>
                              <span
                                className={`font-semibold ${
                                  stock.change >= 0
                                    ? 'text-green-600'
                                    : 'text-red-600'
                                }`}
                              >
                                {stock.change >= 0 ? '+' : ''}
                                {stock.change.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">
                                Change %
                              </span>
                              <span
                                className={`font-semibold ${
                                  stock.changePercent >= 0
                                    ? 'text-green-600'
                                    : 'text-red-600'
                                }`}
                              >
                                {stock.changePercent >= 0 ? '+' : ''}
                                {stock.changePercent.toFixed(2)}%
                              </span>
                            </div>
                          </div>

                          {/* Mini Progress Bar */}
                          <div className="mt-4 h-1 bg-muted rounded overflow-hidden">
                            <div
                              className={`h-full transition-all ${
                                stock.change >= 0 ? 'bg-green-500' : 'bg-red-500'
                              }`}
                              style={{
                                width: `${Math.min(
                                  Math.abs(stock.changePercent) * 10,
                                  100
                                )}%`,
                              }}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* News Sidebar */}
              <div className="lg:col-span-1">
                <FinancialNews />
              </div>
            </div>
          </div>
        </section>

        {/* Market Info */}
        <section className="py-12 bg-muted/20 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-playfair font-semibold mb-8">
              About Market Data
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Real-Time Updates</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Market data is refreshed every 30 seconds to keep you informed of the
                  latest price movements and market trends.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Institutional Grade</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Data sourced from reliable financial data providers used by institutional
                  investors and professional traders worldwide.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Comprehensive Coverage</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Track major indices, individual stocks, currencies, commodities, and
                  cryptocurrencies all in one place.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
