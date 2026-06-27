import { CURRENCIES } from "@/constants"
import { ISession } from "../models/Session.model"
import { Types } from "mongoose"

export type Currency = (typeof CURRENCIES)[number]

export type SessionType = ISession & {
  _id: Types.ObjectId
}
