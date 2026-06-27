import connectDB from "@/lib/db"
import { Types } from "mongoose"
import { getSessionId } from "./cookies"
import Session from "@/lib/models/Session.model"

const sessionExpiryDays = Number(process.env.SESSION_EXPIRY_DAYS ?? 7)

export interface CreateSessionDataParams {
  userId: Types.ObjectId
  ipAddress: string
  userAgent: string
}

const generateSessionId = () => {
  return crypto.randomUUID()
}

const calculateExpiryDate = () => {
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + sessionExpiryDays)
  return expiresAt
}

export const createSessionData = ({
  userId,
  ipAddress,
  userAgent,
}: CreateSessionDataParams) => {
  return {
    sessionId: generateSessionId(),
    userId,
    ipAddress,
    userAgent,
    lastActivity: new Date(),
    expiresAt: calculateExpiryDate(),
  }
}

export const getCurrentSession = async () => {
  await connectDB()

  const sessionId = await getSessionId()
  if (!sessionId) return null

  const session = await Session.findOne({ sessionId }).populate("userId")

  if (!session) return null

  if (session.expiresAt < new Date()) return null

  return {
    session,
    user: session.userId,
  }
}
