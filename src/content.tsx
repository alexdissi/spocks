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

const detectTickers = async (html: string): Promise<Record<string, string>> => {
  try {
    const res = await fetch("http://localhost:8080/api/price/detect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ html })
    })

    if (!res.ok) return {}

    const matches = await res.json()
    const map: Record<string, string> = {}

    for (const match of matches) {
      map[match.matchedText] = match.ticker
    }

    return map
  } catch (e) {
    console.error("Error detecting tickers:", e)
    return {}
  }
}

const injectPopover = (node: Text, label: string, ticker: string) => {
  const parent = node.parentElement

  const isUnsafeTag = ["A", "BUTTON"].includes(parent?.tagName || "")
  if (isUnsafeTag || !parent) return

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

  parent.replaceChild(after, node)
  parent.insertBefore(finalContainer, after)
  parent.insertBefore(before, finalContainer)

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

const run = async () => {
  const html = document.body.innerHTML
  const STOCKS = await detectTickers(html)

  if (!Object.keys(STOCKS).length) return

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  const targets: Array<{ node: Text; label: string; ticker: string }> = []

  while (walker.nextNode()) {
    const node = walker.currentNode as Text
    if (!node?.nodeValue) continue

    for (const label in STOCKS) {
      if (node.nodeValue.includes(label)) {
        targets.push({ node, label, ticker: STOCKS[label] })
        break // éviter doublons sur même node
      }
    }
  }

  for (const { node, label, ticker } of targets) {
    injectPopover(node, label, ticker)
  }
}

run()
