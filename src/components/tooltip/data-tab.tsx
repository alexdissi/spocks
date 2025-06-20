import type { StockInfo } from "@/interfaces/stocks"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import {
  Calendar,
  DollarSign,
  PieChart,
  Target,
  TrendingUp
} from "lucide-react"

export default function StockDataTab({ data }: { data: StockInfo }) {
  return (
    <div className="space-y-4 max-h-80 overflow-y-auto">
      {data.revenue && (
        <div className="bg-yellow-50 rounded-lg p-4">
          <h3 className="flex items-center gap-2 font-semibold text-yellow-900 mb-3">
            <DollarSign className="w-4 h-4" />
            Revenue
          </h3>
          <div className="font-bold text-yellow-900 text-lg">
            {data.revenue}
          </div>
        </div>
      )}

      {data.dividendReporting && (
        <div className="bg-yellow-50 rounded-lg p-4">
          <h3 className="flex items-center gap-2 font-semibold text-yellow-900 mb-3">
            <DollarSign className="w-4 h-4" />
            Dividende
          </h3>
          <div className="font-bold text-yellow-900 text-lg">
            {data.dividendReporting}
          </div>
        </div>
      )}

      {(data.dividendRate ||
        data.dividendYield ||
        data.dividendRateForecast ||
        data.dividendExDate) && (
        <div className="bg-green-50 rounded-lg p-4">
          <h3 className="flex items-center gap-2 font-semibold text-green-900 mb-3">
            <TrendingUp className="w-4 h-4" />
            Dividends
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {data.dividendRate && (
              <div>
                <div className="text-xs text-green-700 uppercase tracking-wide">
                  Dividend Rate
                </div>
                <div className="font-bold text-green-900">
                  {formatCurrency(data.dividendRate)}
                </div>
              </div>
            )}
            {data.dividendYield && (
              <div>
                <div className="text-xs text-green-700 uppercase tracking-wide">
                  Yield
                </div>
                <div className="font-bold text-green-900">
                  {formatPercentage(data.dividendYield)}
                </div>
              </div>
            )}
            {data.dividendRateForecast && (
              <div className="col-span-2">
                <div className="text-xs text-green-700 uppercase tracking-wide">
                  Forecast
                </div>
                <div className="font-bold text-green-900">
                  {formatCurrency(data.dividendRateForecast)}
                </div>
              </div>
            )}
            {data.dividendExDate && (
              <div className="col-span-2">
                <div className="text-xs text-green-700 uppercase tracking-wide">
                  Ex-Date
                </div>
                <div className="font-bold text-green-900">
                  {new Date(data.dividendExDate).toLocaleDateString("en-US")}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {data.lastSctr && (
          <div className="bg-orange-50 rounded-lg p-4">
            <h3 className="flex items-center gap-2 font-semibold text-orange-900 mb-2">
              <Target className="w-4 h-4" />
              SCTR
            </h3>
            <div className="font-bold text-orange-900 text-lg">
              {data.lastSctr.toFixed(1)}
            </div>
          </div>
        )}
        {data.rsi && (
          <div className="bg-red-50 rounded-lg p-4">
            <h3 className="flex items-center gap-2 font-semibold text-red-900 mb-2">
              <PieChart className="w-4 h-4" />
              RSI
            </h3>
            <div className="font-bold text-red-900 text-lg">
              {data.rsi.toFixed(2)}
            </div>
          </div>
        )}
        {data.nextEarningsDate && (
          <div className="bg-gray-50 rounded-lg p-4 col-span-2">
            <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-2">
              <Calendar className="w-4 h-4" />
              Next Earnings
            </h3>
            <div className="font-bold text-gray-900 text-sm">
              {new Date(data.nextEarningsDate).toLocaleDateString("en-US")}
            </div>
          </div>
        )}
      </div>

      {data.revenuePerShare && (
        <div className="bg-yellow-50 rounded-lg p-4">
          <h3 className="flex items-center gap-2 font-semibold text-yellow-900 mb-3">
            <DollarSign className="w-4 h-4" />
            Revenue per share
          </h3>
          <div className="font-bold text-yellow-900 text-lg">
            {formatCurrency(data.revenuePerShare)}
          </div>
        </div>
      )}
    </div>
  )
}
