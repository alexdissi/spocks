import "./style.css"
import "@/styles/globals.css"

import { Button } from "./components/ui/button"
import { CountButton } from "./features/count-button"

function IndexPopup() {
  return (
    <div className="plasmo-flex plasmo-items-center plasmo-justify-center plasmo-h-16 plasmo-w-40">
      <Button>CLICK ME</Button>
    </div>
  )
}

export default IndexPopup
