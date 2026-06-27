"use client"

import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SignupForm from "./SignUpForm"
import { SignupFormValues } from "@/lib/schemas/auth.schemas"
import { useTransition } from "react"
import { toast } from "sonner"
import { signupAction } from "@/lib/actions/auth.actions"
import { useRouter } from "next/navigation"

const SignUpSection = () => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = (data: SignupFormValues) => {
    startTransition(async () => {
      try {
        const response = await signupAction(data)

        if (!response.success) {
          toast.error(response.message)
          return
        }

        toast.success(response.message ?? "Signed Up Successfully")
        router.push("/login")
      } catch (error) {
        console.log(error)
        toast.error("Error while signing up")
      }
    })
  }

  return (
    <Card className="w-full max-w-md border shadow-lg">
      <CardHeader className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">ExpenseTracker</h1>

        <CardTitle>Create your account</CardTitle>

        <CardDescription>
          Manage your expenses, budgets and analytics from one place.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <SignupForm onSubmit={handleSubmit} isLoading={isPending} />

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default SignUpSection
