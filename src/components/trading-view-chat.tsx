"use client"

interface Props {
  symbol: string // exemple: "AAPL"
}

export const TradingViewChart = ({ symbol }: Props) => {
  return (
    <div className="w-full h-[250px]">
      <iframe
        src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_${symbol}&symbol=${symbol}&interval=D&hidesidetoolbar=1&hidetoptoolbar=1&symboledit=1&saveimage=1&toolbarbg=F1F3F6&studies=[]&hideideas=1&theme=light&style=1&timezone=Europe/Paris&enabled_features=[]&disabled_features=[]&locale=fr`}
        style={{ width: "100%", height: "100%", border: "none" }}
        allowTransparency
        scrolling="no"
        allow="clipboard-write"
      />
    </div>
  )
}
