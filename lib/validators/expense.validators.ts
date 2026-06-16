import { ExpenseFormValues, expenseQuerySchema, ExpenseQueryType, expenseSchema } from "../schemas/expense.schemas";


export function validateExpense(data: ExpenseFormValues) {
    return expenseSchema.safeParse(data);
}

export function validateExpensePaginationType(data: ExpenseQueryType) {
    return expenseQuerySchema.safeParse(data)
}