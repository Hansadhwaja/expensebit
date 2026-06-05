"use server";

import { ExpenseFormValues } from "@/lib/schemas/expense.schemas";
import { ActionResponse } from "@/types";
import { validateExpense } from "../validators/expense.validators";
import { createExpenseService, getExpensesService } from "../services/expense.services";
import { USER } from "@/constants";
import { Expense } from "@/types/expense.types";
import { revalidatePath } from "next/cache";

export async function addExpenseAction(
    data: ExpenseFormValues
): Promise<ActionResponse<{ id: string }>> {
    try {

        const userId = USER.id;

        const validatedData = validateExpense(data);

        if (!validatedData.success) {
            return {
                success: false,
                message: validatedData.error.issues[0]?.message ?? "Invalid form data"
            }
        }

        const { id } = await createExpenseService({
            ...validatedData.data,
            userId
        });

        revalidatePath("/dashboard/expenses");

        return {
            success: true,
            message: 'Expense Created Successfully',
            data: { id }
        }


    } catch (error) {
        console.log("[ADD_EXPENSE_ACTION]", error);
        return {
            success: false,
            message: "Failed to create Expense",
        }
    }
}

export async function getExpensesAction(): Promise<ActionResponse<{ expenses: Expense[] }>> {
    try {
        const expenses = await getExpensesService();

        return {
            success: true,
            message: 'Expenses Fetched Successfully',
            data: { expenses }
        }
    } catch (error) {
        console.log("[GET_EXPENSES_ACTION]", error);
        return {
            success: false,
            message: 'Error while fetching all expenses'
        }
    }
}