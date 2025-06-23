import { getUser, login } from "@/auth/auth-service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMutation } from "@tanstack/react-query"

export function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const email = formData.get("email") as string
      const password = formData.get("password") as string
      await login(email, password)
      await getUser()
      onSuccess()
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    mutation.mutate(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <Input name="email" type="email" placeholder="Email" required />
      <Input name="password" type="password" placeholder="Password" required />
      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Logging in..." : "Login"}
      </Button>
      {mutation.isError && (
        <p className="text-red-500 text-sm">
          {(mutation.error as Error).message}
        </p>
      )}
    </form>
  )
}
