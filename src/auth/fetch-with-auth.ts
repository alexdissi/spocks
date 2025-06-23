import { getToken } from "./auth-service"

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = await getToken()
  const headers = new Headers(options.headers || {})

  if (token) {
    headers.set("Authorization", `Bearer ${token}`)
  }

  return fetch(url, {
    ...options,
    headers
  })
}