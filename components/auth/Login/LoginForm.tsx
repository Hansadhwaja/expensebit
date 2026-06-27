"use client"

import { useMemo } from "react"
import { ControllerRenderProps, Path, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { loginSchema, LoginFormValues } from "@/lib/schemas/auth.schemas"

import { FormField } from "@/components/common/Form/FormField"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Loader from "@/components/common/Loader/Loader"

type LoginField = {
  name: Path<LoginFormValues>
  label: string
  render: (
    field: ControllerRenderProps<LoginFormValues, Path<LoginFormValues>>
  ) => React.ReactNode
}

type FieldGroup = {
  className?: string
  fields: LoginField[]
}

interface Props {
  onSubmit: (values: LoginFormValues) => Promise<void>
  isLoading: boolean
}

const LoginForm = ({ onSubmit, isLoading }: Props) => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = form

  const onFormSubmit = async (values: LoginFormValues) => {
    try {
      await onSubmit(values)
      reset()
    } catch (error) {
      console.error(error)
    }
  }

  const fieldGroups: FieldGroup[] = useMemo(
    () => [
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
        fields: [
          {
            name: "password",
            label: "Password",
            render: (field) => (
              <Input
                {...field}
                type="password"
                placeholder="Enter your password"
              />
            ),
          },
        ],
      },
    ],
    []
  )

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
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
        {isLoading ? <Loader /> : "Sign In"}
      </Button>
    </form>
  )
}

export default LoginForm
