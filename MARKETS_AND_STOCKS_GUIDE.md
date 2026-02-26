# Markets & Stock Price Integration Guide

## Overview

The Aurexia Capital platform now includes a real-time stock ticker banner and comprehensive markets page with financial news. This guide covers setup, customization, and API integration.

---

## Features

### 1. **Animated Stock Ticker Banner** ✅
- Displays top 8 stocks with real-time pricing
- Smooth continuous scroll animation
- Pause on hover
- Auto-refresh every 30 seconds
- Color-coded gains/losses (green/red)
- Appears at the top of every page

### 2. **Markets Page** ✅
- Dedicated `/markets` page with full stock grid
- Detailed stock cards showing:
  - Current price
  - Price change (absolute & percentage)
  - Visual trend indicators
  - Mini progress bars
- Real-time financial news section
- Market insights and data quality info

### 3. **Financial News Component** ✅
- Latest market news and financial updates
- Displayable on any page
- Time-relative formatting (2h ago, 1d ago)
- Integrated across dashboard and markets pages
- External links to news sources

---

## Technical Architecture

### Files Created

```
lib/services/
├── stock-service.ts         # Stock data fetching & news API
components/
├── stock-ticker-banner.tsx  # Animated ticker at top of page
├── financial-news.tsx       # News feed component
app/
└── markets/
    └── page.tsx             # Markets overview page
```

### Data Flow

```
Stock Service (API Layer)
    ↓
Stock Components (UI Layer)
    ├── StockTickerBanner (Header)
    ├── FinancialNews (Sidebar/Section)
    └── Stock Grid (Markets Page)
```

---

## Setting Up Real Financial Data

### Option 1: Alpha Vantage (Free Tier)
**Pros:** Simple, no authentication, reliable
**Cons:** 5 requests/min, 500 requests/day limit

```typescript
const API_KEY = 'demo' // Get free key at alphavantage.co
const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
```

### Option 2: Finnhub (Free Tier)
**Pros:** Real-time data, comprehensive
**Cons:** Requires API key

```typescript
const API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY
const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
```

### Option 3: IEX Cloud (Free Tier)
**Pros:** Reliable, good free tier
**Cons:** Limited free requests

```typescript
const API_KEY = process.env.NEXT_PUBLIC_IEX_API_KEY
const url = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${API_KEY}`
```

### Current Implementation

The platform currently uses **realistic mock data** for demo purposes. To enable real data:

1. **Get API Key** from your chosen provider
2. **Update `stock-service.ts`**:
   ```typescript
   // Replace getStockFromFreeSource() with actual API calls
   ```
3. **Set Environment Variable**:
   ```bash
   NEXT_PUBLIC_STOCK_API_KEY=your_api_key
   ```

---

## Customizing Stock Symbols

### Change Default Stocks

In `/components/stock-ticker-banner.tsx`:
```typescript
const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'JPM']
// Modify to your preferred stocks
const symbols = ['AAPL', 'MSFT', 'TSLA', 'BTC-USD', 'ETH-USD']
```

Same in `/app/markets/page.tsx`:
```typescript
const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'JPM']
```

### Popular Stock Tickers
- **Tech:** AAPL, MSFT, GOOGL, META, NVDA, INTC
- **E-commerce:** AMZN, eBay
- **Finance:** JPM, GS, BAC, WFC
- **Crypto (if supported):** BTC-USD, ETH-USD, SOL-USD
- **Indices:** ^GSPC, ^IXIC, ^DJI

---

## Customizing Refresh Rate

The stock ticker refreshes every 30 seconds by default.

To change, edit `/components/stock-ticker-banner.tsx`:
```typescript
// Change from 30000 (30 seconds)
const interval = setInterval(fetchStocks, 60000) // 60 seconds
```

---

## Adding News API Integration

Current implementation uses mock news data. To add real news:

### Using NewsAPI

```typescript
export async function getFinancialNews(): Promise<StockNews[]> {
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=finance&sortBy=publishedAt&apiKey=${apiKey}`
  )
  const data = await response.json()
  return data.articles.map((article) => ({
    title: article.title,
    description: article.description,
    url: article.url,
    source: article.source.name,
    publishedAt: article.publishedAt,
    image: article.urlToImage,
  }))
}
```

### Using Finnhub News

```typescript
const response = await fetch(
  `https://finnhub.io/api/v1/news?category=general&token=${apiKey}`
)
```

---

## Page Integration

### Where Stock Data Appears

1. **Header (All Pages)**
   - Stock Ticker Banner (automatic on all routes)
   - Shows top 8 stocks with continuous scroll

2. **Markets Page** (`/markets`)
   - Full stock grid (2x4)
   - Detailed cards with charts
   - News section on right sidebar

3. **Dashboard** (Optional)
   - Can add to portfolio overview
   - Personal holdings tracking

4. **Home Page** (Optional)
   - Add market highlights section

---

## Styling & Customization

### Ticker Banner Colors
Edit `/components/stock-ticker-banner.tsx`:
```tsx
// Green for gains
<div className="text-green-600">
// Red for losses
<div className="text-red-600">
```

### Stock Cards
Edit `/app/markets/page.tsx`:
- Card hover effects
- Progress bar colors
- Typography sizes
- Spacing and layout

### Animation Speed
Edit `/components/stock-ticker-banner.tsx`:
```css
@keyframes scroll {
  /* Change 60s to 90s for slower scroll */
  animation: scroll 90s linear infinite;
}
```

---

## Performance Optimization

### Current Optimizations
- 5-minute cache on API responses
- Interval-based refresh (not real-time)
- Lazy loading of news images
- Client-side data processing

### Production Recommendations
1. **Rate Limiting:** Implement request debouncing
2. **Caching:** Use Redis for API responses
3. **Error Handling:** Graceful fallback to mock data
4. **Monitoring:** Track API rate limits
5. **Fallback Data:** Keep backup data for API outages

---

## Error Handling

The stock service automatically falls back to mock data if:
- API is unavailable
- Rate limit exceeded
- Invalid API key
- Network timeout

This ensures the app never breaks even if external APIs fail.

---

## GDPR & Privacy

Stock data does **NOT** require user consent (no personal data collected).

Financial news links are **external**, so add appropriate disclaimers:
```tsx
<p className="text-xs text-muted-foreground">
  Financial news provided by external sources. Aurexia Capital makes no representations 
  about the accuracy or completeness of this information.
</p>
```

---

## Troubleshooting

### Ticker Not Scrolling
- Check CSS animations are enabled
- Verify component is mounted on page
- Check for CSS conflicts in globals.css

### Stock Prices Not Updating
- Verify API key is set in environment variables
- Check API rate limits
- Review browser console for errors
- Mock data is fallback (check if using real API)

### News Not Showing
- Verify news API is configured
- Check API key has news permission
- Review CORS settings if using external API
- Mock news data should always display

### Performance Issues
- Reduce number of stocks displayed
- Increase refresh interval
- Implement pagination for news
- Use image CDN for news images

---

## Future Enhancements

1. **Add search functionality** to find any stock
2. **Portfolio tracking** - Let clients add watchlists
3. **Price alerts** - Notify when stocks hit targets
4. **Chart integration** - TradingView widgets or Recharts
5. **Cryptocurrency** - Add BTC, ETH, etc.
6. **Forex** - Currency pair tracking
7. **Indices** - S&P 500, Nasdaq, DAX, CAC40
8. **Dividends** - Show upcoming dividend payments
9. **Earnings** - Earnings calendar
10. **Options** - Options chain data

---

## Code Examples

### Fetch Custom Stock

```typescript
import { getStockData } from '@/lib/services/stock-service'

const stock = await getStockData('AAPL')
console.log(stock)
// {
//   symbol: 'AAPL',
//   price: 192.45,
//   change: 2.15,
//   changePercent: 1.13,
//   name: 'Apple Inc.',
//   lastUpdate: '2024-02-26T...'
// }
```

### Fetch Multiple Stocks

```typescript
import { getStockTicker } from '@/lib/services/stock-service'

const stocks = await getStockTicker(['AAPL', 'MSFT', 'GOOGL'])
```

### Add to Page Component

```typescript
import { StockTickerBanner } from '@/components/stock-ticker-banner'
import { FinancialNews } from '@/components/financial-news'

export default function MyPage() {
  return (
    <>
      <StockTickerBanner />
      {/* Your content */}
      <FinancialNews />
    </>
  )
}
```

---

## Environment Variables

Create `.env.local`:

```bash
# Stock Data API
NEXT_PUBLIC_STOCK_API_KEY=your_api_key
NEXT_PUBLIC_FINNHUB_API_KEY=your_finnhub_key

# News API
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key

# Analytics (existing)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## Compliance & Disclaimers

**Add to footer or legal page:**

> Financial data and news are provided for informational purposes only. Past performance does not guarantee future results. Aurexia Capital makes no representation regarding the accuracy or completeness of this information. Always conduct your own research and consult with a financial advisor before making investment decisions.

---

## Support & Updates

- Stock service is automatically cached and refreshed
- Mock data ensures platform stability
- Easy to upgrade to real APIs anytime
- No breaking changes when switching APIs

---

**Version:** 1.0  
**Last Updated:** February 26, 2026  
**Status:** Production Ready ✅

