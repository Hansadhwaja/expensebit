"use client"

import { useMemo } from "react"
import { ControllerRenderProps, Path, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { signupSchema, SignupFormValues } from "@/lib/schemas/auth.schemas"

import { FormField } from "@/components/common/Form/FormField"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Loader from "@/components/common/Loader/Loader"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SignupField = {
  name: Path<SignupFormValues>
  label: string
  render: (
    field: ControllerRenderProps<SignupFormValues, Path<SignupFormValues>>
  ) => React.ReactNode
}

type FieldGroup = {
  className?: string
  fields: SignupField[]
}

interface Props {
  onSubmit: (values: SignupFormValues) => void
  isLoading: boolean
}

const SignupForm = ({ onSubmit, isLoading }: Props) => {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      currency: "INR",
    },
  })

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = form

  const onFormSubmit = async (values: SignupFormValues) => {
    try {
      await onSubmit(values)
      reset()
    } catch (error) {
      console.error(error)
    }
  }

  const fieldGroups: FieldGroup[] = useMemo(() => {
    return [
      {
        fields: [
          {
            name: "name",
            label: "Full Name",
            render: (field) => (
              <Input {...field} placeholder="Enter your full name" />
            ),
          },
        ],
      },
      {
        fields: [
          {
            name: "email",
            label: "Email",
            render: (field) => (
              <Input {...field} type="email" placeholder="Enter your email" />
            ),
          },
        ],
      },
      {
        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
        fields: [
          {
            name: "password",
            label: "Password",
            render: (field) => (
              <Input {...field} type="password" placeholder="Enter password" />
            ),
          },
          {
            name: "confirmPassword",
            label: "Confirm Password",
            render: (field) => (
              <Input
                {...field}
                type="password"
                placeholder="Confirm password"
              />
            ),
          },
        ],
      },
      {
        fields: [
          {
            name: "currency",
            label: "Preferred Currency",
            render: (field) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="INR">🇮🇳 INR</SelectItem>
                  <SelectItem value="USD">🇺🇸 USD</SelectItem>
                  <SelectItem value="EUR">🇪🇺 EUR</SelectItem>
                  <SelectItem value="AED">🇦🇪 AED</SelectItem>
                </SelectContent>
              </Select>
            ),
          },
        ],
      },
    ]
  }, [])

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      {fieldGroups.map((group, index) => (
        <div key={index} className={group.className}>
          {group.fields.map((field) => (
            <FormField
              key={field.name}
              control={control}
              name={field.name}
              label={field.label}
              render={field.render}
            />
          ))}
        </div>
      ))}

      <Button type="submit" disabled={!isValid || isLoading} className="w-full">
        {isLoading ? <Loader /> : "Create Account"}
      </Button>
    </form>
  )
}

export default SignupForm
