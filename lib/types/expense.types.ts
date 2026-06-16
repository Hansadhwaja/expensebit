import { Category } from "./category.types"

export type PaymentMethod = "cash" | "upi" | "card" | "bank" | "other"

export type Expense = {
  _id: string
  title: string
  amount: number
  category: Category
  paymentMethod: PaymentMethod
  date: string
  note?: string | undefined
  receiptImage?: string | undefined
}

export type ExpenseQuery = {
  userId: string
  title?: {
    $regex: string
    $options: string
  }
  category?: string
  paymentMethod?: string
  date?: {
    $gte?: Date
    $lte?: Date
  }
}
