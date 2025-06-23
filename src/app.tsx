import "@/styles/globals.css"

import { getToken, getUser, logout } from "@/auth/auth-service"
import { Button } from "@/components/ui/button"
import type { User } from "@/interfaces/user"
import { useEffect, useState } from "react"

import { LoginForm } from "./components/auth/loginForm"
import { RegisterForm } from "./components/auth/registerForm"

export default function App() {
  const [user, setUser] = useState<User | null>(null)
  const [mode, setMode] = useState<"login" | "register">("login")

  useEffect(() => {
    getToken().then(async (token) => {
      if (token) {
        const u = await getUser()
        setUser(u)
      }
    })
  }, [])

  const handleSuccess = async () => {
    const u = await getUser()
    setUser(u)
  }

  const handleLogout = async () => {
    await logout()
    setUser(null)
  }

  return (
    <div className="p-4 w-80 flex flex-col gap-3">
      {user ? (
        <>
          <p className="text-green-600">
            ✅ Hello {user.firstName} {user.lastName}!
          </p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <>
          {mode === "register" ? (
            <RegisterForm onSuccess={handleSuccess} />
          ) : (
            <LoginForm onSuccess={handleSuccess} />
          )}
          <button
            className="text-xs text-blue-500 underline mt-2"
            onClick={() => setMode(mode === "login" ? "register" : "login")}>
            {mode === "login"
              ? "Create an account"
              : "Already have an account?"}
          </button>
        </>
      )}
    </div>
  )
}
