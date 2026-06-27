"use server"

import { LoginFormValues, SignupFormValues } from "../schemas/auth.schemas"
import {
  loginService,
  logoutService,
  signupService,
} from "../services/auth.services"
import { ActionResponse } from "../types"
import {
  getSessionId,
  removeSessionId,
  setSessionId,
} from "../utils/auth/cookies"
import { getRequestMetadata } from "../utils/auth/request"
import {
  validateLoginData,
  validateSignUpData,
} from "../validators/auth.validators"

export async function signupAction(
  data: SignupFormValues
): Promise<ActionResponse<void>> {
  try {
    const validatedData = validateSignUpData(data)

    if (!validatedData.success) {
      return {
        success: false,
        message:
          validatedData.error.issues[0].message ?? "Invalid Sign Up Form Data",
      }
    }

    await signupService(validatedData.data)

    return {
      success: true,
      message: "Signed Up Successfully",
    }
  } catch (error) {
    console.log("[SIGNUP_ACTION]", error)
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error while signing up",
    }
  }
}

export async function loginAction(
  data: LoginFormValues
): Promise<ActionResponse<void>> {
  try {
    const validatedData = validateLoginData(data)

    if (!validatedData.success) {
      return {
        success: false,
        message:
          validatedData.error.issues[0].message ?? "Invalid Login Form Data",
      }
    }

    const metadata = await getRequestMetadata()
    const session = await loginService(validatedData.data, metadata)

    await setSessionId(session.sessionId, session.expiresAt)

    return {
      success: true,
      message: "Logged In Successfully",
    }
  } catch (error) {
    console.log("[LOGIN_ACTION]", error)
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error while logging in",
    }
  }
}

export async function logoutAction(): Promise<ActionResponse<void>> {
  try {
    const sessionId = await getSessionId()

    if (!sessionId) {
      return {
        success: true,
        message: "Already logged out",
      }
    }

    await logoutService(sessionId)
    await removeSessionId()
    return {
      success: true,
      message: "Logged Out Successfully",
    }
  } catch (error) {
    console.log("[LOGOUT_ACTION]", error)
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error while logging out",
    }
  }
}
