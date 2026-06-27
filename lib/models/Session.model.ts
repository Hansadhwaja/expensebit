import { model, models, Schema } from "mongoose"

export interface ISession {
  sessionId: string
  userId: Schema.Types.ObjectId
  ipAddress: string
  userAgent?: string
  lastActivity: Date
  expiresAt: Date
}

const sessionSchema = new Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
    },
    lastActivity: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      required: true,
      expires: 0,
    },
  },
  { timestamps: true, versionKey: false }
)

const Session = models.Session || model("Session", sessionSchema)

export default Session
