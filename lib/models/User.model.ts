import { model, models, Schema } from "mongoose"
import { Currency } from "../types/auth.types"
import { CURRENCIES } from "@/constants"

export interface IUser {
  name: string
  email: string
  passwordHash: string
  image?: string
  currency: Currency
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    image: {
      type: String,
    },
    currency: {
      type: String,
      enum: CURRENCIES,
      default: "INR",
    },
  },
  { timestamps: true, versionKey: false }
)

const User = models.User || model<IUser>("User", userSchema)

export default User
