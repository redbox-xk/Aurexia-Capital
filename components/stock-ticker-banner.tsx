'use client'

import { useEffect, useState } from 'react'
import { getStockTicker, StockData } from '@/lib/services/stock-service'
import { TrendingUp, TrendingDown } from 'lucide-react'

export function StockTickerBanner() {
  const [stocks, setStocks] = useState<StockData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStocks = async () => {
      // Popular stocks to track
      const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'JPM']
      const data = await getStockTicker(symbols)
      setStocks([...data, ...data]) // Duplicate for infinite scroll effect
      setIsLoading(false)
    }

    fetchStocks()

    // Refresh every 30 seconds
    const interval = setInterval(fetchStocks, 30000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="bg-primary/5 border-b border-border h-14 flex items-center justify-center text-sm text-muted-foreground">
        Loading market data...
      </div>
    )
  }

  return (
    <div className="bg-background border-b border-border overflow-hidden">
      <div className="flex animate-scroll">
        {stocks.map((stock, idx) => (
          <div
            key={`${stock.symbol}-${idx}`}
            className="flex items-center gap-2 px-8 py-3 whitespace-nowrap border-r border-border/50 last:border-r-0 hover:bg-muted/30 transition"
          >
            <div className="font-semibold text-sm">{stock.symbol}</div>
            <div className="text-sm font-medium">${stock.price.toFixed(2)}</div>
            <div
              className={`flex items-center gap-1 text-xs font-medium ${
                stock.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {stock.change >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 60s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
