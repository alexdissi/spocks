import type { StockInfo } from "@/interfaces/stocks"
import { formatCurrency } from "@/lib/utils"

export default function StockQuarterlyTab({ data }: { data: StockInfo }) {
  return (
    <div className="pb-4 mt-0">
      {data.quarterlyEarnings?.length ? (
        <div className="overflow-x-auto max-h-80">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-gray-100 text-gray-500">
              <tr>
                <th className="px-4 py-2">Period</th>
                <th className="px-4 py-2">EPS Est.</th>
                <th className="px-4 py-2">EPS Actual</th>
                <th className="px-4 py-2">Revenue Est.</th>
                <th className="px-4 py-2">Revenue Actual</th>
                <th className="px-4 py-2">Earnings Date</th>
              </tr>
            </thead>
            <tbody>
              {data.quarterlyEarnings.map((q, i) => (
                <tr key={i} className="border-b">
                  <td className="px-4 py-2 font-medium">{q.fiscalPeriod}</td>
                  <td className="px-4 py-2">{q.estimatedEPS.toFixed(2)}</td>
                  <td className="px-4 py-2">{q.actualEPS.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    {formatCurrency(q.estimatedSales)}
                  </td>
                  <td className="px-4 py-2">{formatCurrency(q.actualSales)}</td>
                  <td className="px-4 py-2">
                    {q.earningsDate
                      ? new Date(q.earningsDate).toLocaleDateString("en-US")
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-10 text-sm">
          No quarterly data available.
        </div>
      )}
    </div>
  )
}
