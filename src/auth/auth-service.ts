import type { User } from "@/interfaces/user"
import { Storage } from "@plasmohq/storage"

const storage = new Storage()
const API_URL = process.env.PLASMO_PUBLIC_API_URL

export const login = async (email: string, password: string): Promise<boolean> => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })

  const data = await res.json()

  if (res.ok && data.token && data.user) {
    await storage.set("token", data.token)
    await storage.set("user", data.user)
    return true
  }

  throw new Error(data.message || "Login failed")
}

export const register = async ({
    email,
    password,
    firstName,
    lastName
  }: User): Promise<boolean> => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, firstName, lastName })
    })
  
    const data = await res.json()
  
    if (res.ok && data.token && data.user) {
      await storage.set("token", data.token)
      await storage.set("user", data.user)
      return true
    }
  
    throw new Error(data.message || "Register failed")
  }

export const logout = async () => {
  await storage.remove("token")
  await storage.remove("user")
}

export const getToken = async (): Promise<string | null> => {
  return await storage.get("token")
}

export const getUser = async (): Promise<User| null> => {
  return await storage.get("user")
}   