"use client"

import Link from "next/link"
import { LogIn } from "lucide-react"

import LoginForm from "./LoginForm"
import { LoginFormValues } from "@/lib/schemas/auth.schemas"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { loginAction } from "@/lib/actions/auth.actions"
import { toast } from "sonner"

const LoginSection = () => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = async (data: LoginFormValues) => {
    startTransition(async () => {
      try {
        const response = await loginAction(data)

        if (!response.success) {
          toast.error(response.message)
          return
        }

        toast.success(response.message ?? "Logged In Successfully")
        router.push("/dashboard")
      } catch (error) {
        console.log(error)
        toast.error("Error while logging in")
      }
    })
  }

  return (
    <Card className="border bg-background/75 shadow-2xl backdrop-blur-xl">
      <CardHeader className="space-y-4 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <LogIn className="h-7 w-7 text-primary" />
        </div>

        <div>
          <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>

          <CardDescription className="mt-2">
            Sign in to continue managing your expenses.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <LoginForm onSubmit={handleSubmit} isLoading={isPending} />

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-primary hover:underline"
          >
            Create Account
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}

export default LoginSection
