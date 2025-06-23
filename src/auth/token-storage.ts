import { Storage } from "@plasmohq/storage"

const storage = new Storage()

export const setItem = async <T>(key: string, value: T): Promise<void> => {
  await storage.set(key, value)
}

export const getItem = async <T>(key: string): Promise<T | null> => {
  return await storage.get(key)
}

export const removeItem = async (key: string): Promise<void> => {
  await storage.remove(key)
}