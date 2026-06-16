import { z } from "zod";

export const expenseSchema = z.object({
    title: z.string().min(1, "Title is required"),
    amount: z.number().min(0, "Amount is required"),
    category: z.string().min(1, "Please select any category"),
    paymentMethod: z.enum(["cash", "upi", "card", "bank", "other"], "Please select any payment method"),
    note: z.string().optional(),
    date: z.string().min(1, "Date is required"),
    receiptImage: z.string().optional(),
});

export type ExpenseFormValues = z.infer<typeof expenseSchema>;

export const expenseQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10),
    search: z.string().optional(),
});

export type ExpenseQueryType = z.infer<typeof expenseQuerySchema>;