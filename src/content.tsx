import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { CandlestickChart } from "lucide-react"
import type { PlasmoCSConfig } from "plasmo"
import { createRoot } from "react-dom/client"

import StockHoverModal from "./components/tooltip/stock-tooltip"

import "@/styles/globals.css"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

const queryClient = new QueryClient()

const STOCKS: Record<string, string> = {
  Apple: "AAPL",
  Tesla: "TSLA",
  Microsoft: "MSFT",
  Amazon: "AMZN",
  AAPL: "AAPL",
  TSLA: "TSLA",
  MSFT: "MSFT",
  AMZN: "AMZN"
}

const injectPopover = (node: Text, label: string, ticker: string) => {
  const parent = node.parentElement

  const isUnsafeTag = ["A", "BUTTON"].includes(parent?.tagName || "")
  const safeWrapper = document.createElement("span")
  safeWrapper.textContent = label

  const reactMount = document.createElement("span")
  reactMount.style.display = "inline-block"
  reactMount.style.marginLeft = "4px"

  const finalContainer = document.createElement("span")
  finalContainer.style.display = "inline-flex"
  finalContainer.style.alignItems = "center"
  finalContainer.style.gap = "4px"
  finalContainer.appendChild(safeWrapper)
  finalContainer.appendChild(reactMount)

  const parts = node.nodeValue!.split(label)
  const before = document.createTextNode(parts[0])
  const after = document.createTextNode(parts[1] || "")

  if (parent) {
    parent.replaceChild(after, node)
    parent.insertBefore(finalContainer, after)
    parent.insertBefore(before, finalContainer)
  }

  const root = createRoot(reactMount)
  root.render(
    <QueryClientProvider client={queryClient}>
      <Popover>
        <PopoverTrigger asChild>
          <span className="text-blue-600 cursor-pointer">
            <CandlestickChart size={16} />
          </span>
        </PopoverTrigger>
        <PopoverContent>
          <StockHoverModal ticker={ticker} />
        </PopoverContent>
      </Popover>
    </QueryClientProvider>
  )
}

const run = () => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  while (walker.nextNode()) {
    const node = walker.currentNode as Text
    if (!node?.nodeValue) continue

    for (const label in STOCKS) {
      if (node.nodeValue.includes(label)) {
        injectPopover(node, label, STOCKS[label])
        break
      }
    }
  }
}

run()
