import { Separator } from "@/components/ui/separator"
import type { StockInfo } from "@/interfaces/stocks"
import {
  Building2,
  Calendar,
  CoinsIcon,
  Globe,
  Link,
  MapPin
} from "lucide-react"

export function StockInfoTab({ data }: { data: StockInfo }) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: data.currency
    }).format(value)

  return (
    <div className="space-y-4">
      {data.description && (
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-700 leading-relaxed">
            {data.description}
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-gray-500" />
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Sector
              </div>
              <div className="text-sm text-gray-900">{data.sector}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-500" />
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Industry
              </div>
              <div className="text-sm text-gray-900">{data.industry}</div>
            </div>
          </div>
          {data.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  Location
                </div>
                <div className="text-sm text-gray-900">{data.location}</div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CoinsIcon className="w-4 h-4 text-gray-500" />
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Currency
              </div>
              <div className="text-sm text-gray-900">{data.currency}</div>
            </div>
          </div>
          {data.foundedYear !== 0 && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  Founded in
                </div>
                <div className="text-sm text-gray-900">{data.foundedYear}</div>
              </div>
            </div>
          )}
          {data.website && (
            <div className="flex items-start gap-2">
              <Link className="w-4 h-4 text-gray-500 mt-1" />
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-wide">
                  Website
                </span>
                <a
                  href={`https://${data.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800">
                  {data.website.replace(/^https?:\/\/(www\.)?/, "")}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <Separator />

      <div className="bg-gray-50 rounded-lg p-3">
        <div className="text-sm font-medium text-gray-700 mb-2">Day Range</div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Low: {formatCurrency(data.low)}
          </span>
          <span className="text-sm text-gray-600">
            High: {formatCurrency(data.high)}
          </span>
        </div>
        <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-400 to-green-400 rounded-full"
            style={{
              width: `${((data.price - data.low) / (data.high - data.low)) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  )
}
