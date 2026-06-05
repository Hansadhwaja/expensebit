import { ExpenseFormValues, expenseSchema } from "../schemas/expense.schemas";


export function validateExpense(data: ExpenseFormValues) {
    return expenseSchema.safeParse(data);
}