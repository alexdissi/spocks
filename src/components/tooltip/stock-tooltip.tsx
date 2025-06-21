import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { StockInfo } from "@/interfaces/stocks"
import { useQuery } from "@tanstack/react-query"
import { BarChart3, Calendar, Info, Newspaper, PieChart } from "lucide-react"
import { useState } from "react"

import { TradingViewChart } from "../trading-view-chat"
import StockDataTab from "./data-tab"
import { HeaderSection } from "./header-section"
import { StockInfoTab } from "./info-tabs"
import StockNewsTab from "./news-tab"
import StockQuarterlyTab from "./quarterly-tab"

export default function StockHoverModal({ ticker }: { ticker: string }) {
  const [activeTab, setActiveTab] = useState("info")

  const { data, isLoading, error } = useQuery<StockInfo>({
    queryKey: ["stock", ticker],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:8080/api/price/stocks?ticker=${ticker}`
      )
      if (!res.ok) throw new Error("Error fetching stock data")
      return res.json()
    }
  })

  if (isLoading || !data) return null
  if (error) return null

  return (
    <Card className="w-[480px] shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <HeaderSection data={data} />
      </CardHeader>

      <CardContent className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 h-16">
            <TabsTrigger value="info" className="flex items-center gap-1">
              <Info className="w-4 h-4" /> Info
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-1">
              <PieChart className="w-4 h-4" /> Data
            </TabsTrigger>
            <TabsTrigger value="chart" className="flex items-center gap-1">
              <BarChart3 className="w-4 h-4" /> Chart
            </TabsTrigger>
            <TabsTrigger
              value="quarterly"
              className="flex items-center gap-1 p-3">
              <Calendar className="w-4 h-4" /> Quarterly
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center gap-1">
              <Newspaper className="w-4 h-4" /> News
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <StockInfoTab data={data} />
          </TabsContent>

          <TabsContent value="data">
            <StockDataTab data={data} />
          </TabsContent>

          <TabsContent value="chart">
            <TradingViewChart symbol={data.ticker} />
          </TabsContent>

          <TabsContent value="quarterly">
            <StockQuarterlyTab data={data} />
          </TabsContent>

          <TabsContent value="news">
            <StockNewsTab data={data} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
