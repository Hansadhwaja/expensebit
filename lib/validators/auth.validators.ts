import {
  LoginFormValues,
  loginSchema,
  SignupFormValues,
  signupSchema,
} from "../schemas/auth.schemas"

export function validateSignUpData(data: SignupFormValues) {
  return signupSchema.safeParse(data)
}

export function validateLoginData(data: LoginFormValues) {
  return loginSchema.safeParse(data)
}
