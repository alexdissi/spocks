// components/stock-tabs/StockNewsTab.tsx
"use client"

import { Button } from "@/components/ui/button"
import type { StockInfo } from "@/interfaces/stocks"
import { formatDate } from "@/lib/utils"
import { ExternalLink, Newspaper } from "lucide-react"

export default function StockNewsTab({ data }: { data: StockInfo }) {
  return (
    <div className="space-y-3 max-h-80 overflow-y-auto">
      {data.news.map((article, index) => (
        <div
          key={index}
          className="rounded-lg p-4 hover:bg-gray-50 transition-colors">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 text-sm leading-tight mb-2">
                {article.title}
              </h4>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="font-medium">{article.publisher}</span>
                <span>•</span>
                <span>{formatDate(article.providerPublishTime)}</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" asChild className="shrink-0">
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      ))}
      {data.news.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Newspaper className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">No news available</p>
        </div>
      )}
    </div>
  )
}
