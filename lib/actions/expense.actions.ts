"use server";

import { ExpenseFormValues } from "@/lib/schemas/expense.schemas";
import { ActionResponse } from "@/lib/types";
import { validateExpense } from "../validators/expense.validators";
import { createExpenseService, deleteExpenseService, editExpenseService, getExpensesService } from "../services/expense.services";
import { USER } from "@/constants";
import { Expense } from "@/lib/types/expense.types";
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

export async function editExpenseAction({
    data,
    expenseId
}: {
    data: ExpenseFormValues,
    expenseId: string
}): Promise<ActionResponse<void>> {
    try {

        const userId = USER.id;

        const validatedData = validateExpense(data);

        if (!validatedData.success) {
            return {
                success: false,
                message: validatedData.error.issues[0]?.message ?? "Invalid form data"
            }
        }

        await editExpenseService({
            expenseId,
            data: {
                ...validatedData.data,
                userId,

            }
        });

        revalidatePath("/dashboard/expenses");

        return {
            success: true,
            message: 'Expense Edited Successfully',
        }


    } catch (error) {
        console.log("[EDIT_EXPENSE_ACTION]", error);
        return {
            success: false,
            message: "Failed to edit Expense",
        }
    }
}

export async function deleteExpenseAction(
    expenseId: string
): Promise<ActionResponse<void>> {
    try {

        await deleteExpenseService(expenseId);

        revalidatePath("/dashboard/expenses");

        return {
            success: true,
            message: 'Expense Deleted Successfully',
        }


    } catch (error) {
        console.log("[DELETE_EXPENSE_ACTION]", error);
        return {
            success: false,
            message: "Failed to delete Expense",
        }
    }
}