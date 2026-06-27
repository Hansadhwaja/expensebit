"use server"

import connectDB from "../db"
import Session from "../models/Session.model"
import User from "../models/User.model"
import { LoginFormValues, SignupFormValues } from "../schemas/auth.schemas"
import { comparePassword, hashPassword } from "../utils/auth/password"
import { createSessionData } from "../utils/auth/session"

type LoginMetadata = {
  ipAddress: string
  userAgent: string
}

export async function signupService(data: SignupFormValues) {
  await connectDB()
  const existingUser = await User.findOne({ email: data.email })

  if (existingUser) {
    throw new Error("Email already exists")
  }

  const hashedPassword = await hashPassword(data.password)

  const newUser = {
    name: data.name,
    email: data.email,
    passwordHash: hashedPassword,
    currency: data.currency,
  }

  await User.create(newUser)
}

export async function loginService(
  data: LoginFormValues,
  metadata: LoginMetadata
): Promise<{
  sessionId: string
  expiresAt: Date
}> {
  await connectDB()
  const existingUser = await User.findOne({ email: data.email }).select(
    "+passwordHash"
  )

  if (!existingUser) {
    throw new Error("Invalid Credentials")
  }

  const isPasswordMatched = await comparePassword(
    data.password,
    existingUser.passwordHash
  )

  if (!isPasswordMatched) {
    throw new Error("Invalid Credentials")
  }

  const sessionData = createSessionData({
    userId: existingUser._id,
    ...metadata,
  })

  const session = await Session.create(sessionData)

  return {
    sessionId: session.sessionId,
    expiresAt: session.expiresAt,
  }
}

export async function logoutService(sessionId: string): Promise<void> {
  await connectDB()

  await Session.deleteOne({ sessionId })
}
