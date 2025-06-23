import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import App from "./app"

export default function Popup() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  )
}
