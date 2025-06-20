import { Badge } from "@/components/ui/badge"
import { CardHeader, CardTitle } from "@/components/ui/card"
import type { StockInfo } from "@/interfaces/stocks"
import { formatCurrency } from "@/lib/utils"
import { TrendingDown, TrendingUp } from "lucide-react"
import { useState } from "react"

interface HeaderSectionProps {
  data: StockInfo
}

export function HeaderSection({ data }: HeaderSectionProps) {
  const [isinCopied, setIsinCopied] = useState(false)

  const priceChange = data.price - data.low
  const priceChangePercent = (priceChange / data.low) * 100
  const isPositive = priceChange >= 0

  const copyIsin = async () => {
    if (data.isin) {
      await navigator.clipboard.writeText(data.isin)
      setIsinCopied(true)
      setTimeout(() => setIsinCopied(false), 2000)
    }
  }

  return (
    <CardHeader className="pb-3">
      <div className="flex items-center gap-3">
        {data.logo && (
          <img
            src={data.logo}
            alt={`${data.name} logo`}
            className="w-14 h-14 rounded-lg object-cover"
          />
        )}
        <div className="flex-1">
          <CardTitle className="text-xl font-bold text-gray-900">
            {data.name}
          </CardTitle>
          <div className="flex items-center gap-2 mt-1">
            <Badge
              variant="secondary"
              className="text-xs font-mono p-3"
              style={{
                backgroundColor: data.color ? `${data.color}15` : undefined
              }}>
              {data.ticker}
            </Badge>
            <Badge variant="outline" className="text-xs p-3">
              {data.exchange}
            </Badge>
            {data.isin && (
              <Badge
                variant="outline"
                className="text-xs p-3 text-gray-500 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={copyIsin}
                title="Click to copy ISIN">
                {isinCopied ? "Copied!" : data.isin}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">
            {formatCurrency(data.price, data.currency)}
          </span>
          <div
            className={`flex items-center gap-1 ${isPositive ? "text-green-600" : "text-red-600"}`}>
            {isPositive ? (
              <TrendingUp className="w-5 h-5" />
            ) : (
              <TrendingDown className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">
              {isPositive ? "+" : ""}
              {priceChangePercent.toFixed(2)}%
            </span>
          </div>
        </div>
        <div className="text-right text-sm text-gray-500">
          <div>H: {formatCurrency(data.high, data.currency)}</div>
          <div>L: {formatCurrency(data.low, data.currency)}</div>
        </div>
      </div>
    </CardHeader>
  )
}
