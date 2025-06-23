import { getUser, register } from "@/auth/auth-service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMutation } from "@tanstack/react-query"

export function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        firstName: formData.get("first_name") as string,
        lastName: formData.get("last_name") as string
      }
      await register(data)
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
      <Input name="first_name" placeholder="First name" required />
      <Input name="last_name" placeholder="Last name" required />
      <Input name="email" type="email" placeholder="Email" required />
      <Input name="password" type="password" placeholder="Password" required />
      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Registering..." : "Register"}
      </Button>
      {mutation.isError && (
        <p className="text-red-500 text-sm">
          {(mutation.error as Error).message}
        </p>
      )}
    </form>
  )
}
