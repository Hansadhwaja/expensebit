import { sortOptions } from "@/constants"
import { z } from "zod"

export const expenseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.number().min(0, "Amount is required"),
  category: z.string().min(1, "Please select any category"),
  paymentMethod: z.enum(
    ["cash", "upi", "card", "bank", "other"],
    "Please select any payment method"
  ),
  note: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  receiptImage: z.string().optional(),
})

export type ExpenseFormValues = z.infer<typeof expenseSchema>

export type SortOption = (typeof sortOptions)[number]["value"]
const sortValues = sortOptions.map((s) => s.value) as [string, ...string[]]

export const expenseQuerySchema = z
  .object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10),
    search: z.string().optional(),
    category: z.string().optional(),
    payment: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    sort: z.enum(sortValues).default("latest"),
  })
  .refine(
    (data) =>
      !data.startDate || !data.endDate || data.startDate <= data.endDate,
    {
      message: "Start date must be before end date",
      path: ["endDate"],
    }
  )
export type ExpenseQueryType = z.infer<typeof expenseQuerySchema>
