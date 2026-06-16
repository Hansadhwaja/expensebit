"use server"

import {
  ExpenseFormValues,
  ExpenseQueryType,
} from "@/lib/schemas/expense.schemas"
import { ActionResponse, Pagination } from "@/lib/types"
import {
  validateExpense,
  validateExpenseQueryType,
} from "../validators/expense.validators"
import {
  createExpenseService,
  deleteExpenseService,
  editExpenseService,
  getExpensesService,
} from "../services/expense.services"
import { USER } from "@/constants"
import { Expense } from "@/lib/types/expense.types"
import { revalidatePath } from "next/cache"

export async function addExpenseAction(
  data: ExpenseFormValues
): Promise<ActionResponse<{ id: string }>> {
  try {
    const userId = USER.id

    const validatedData = validateExpense(data)

    if (!validatedData.success) {
      return {
        success: false,
        message: validatedData.error.issues[0]?.message ?? "Invalid form data",
      }
    }

    const { id } = await createExpenseService({
      ...validatedData.data,
      userId,
    })

    revalidatePath("/dashboard/expenses")

    return {
      success: true,
      message: "Expense Created Successfully",
      data: { id },
    }
  } catch (error) {
    console.log("[ADD_EXPENSE_ACTION]", error)
    return {
      success: false,
      message: "Failed to create Expense",
    }
  }
}

export async function getExpensesAction(
  params: ExpenseQueryType
): Promise<ActionResponse<{ expenses: Expense[]; pagination: Pagination }>> {
  try {
    const user = USER

    const validatedPagination = validateExpenseQueryType(params)

    if (!validatedPagination.success) {
      return {
        success: false,
        message:
          validatedPagination.error.issues[0].message ??
          "Invalid Pagination Data",
      }
    }

    const { expenses, pagination } = await getExpensesService({
      ...validatedPagination.data,
      userId: user.id,
    })

    return {
      success: true,
      message: "Expenses Fetched Successfully",
      data: { expenses, pagination },
    }
  } catch (error) {
    console.log("[GET_EXPENSES_ACTION]", error)
    return {
      success: false,
      message: "Error while fetching all expenses",
    }
  }
}

export async function editExpenseAction({
  data,
  expenseId,
}: {
  data: ExpenseFormValues
  expenseId: string
}): Promise<ActionResponse<void>> {
  try {
    const userId = USER.id

    const validatedData = validateExpense(data)

    if (!validatedData.success) {
      return {
        success: false,
        message: validatedData.error.issues[0]?.message ?? "Invalid form data",
      }
    }

    await editExpenseService({
      expenseId,
      data: {
        ...validatedData.data,
        userId,
      },
    })

    revalidatePath("/dashboard/expenses")

    return {
      success: true,
      message: "Expense Edited Successfully",
    }
  } catch (error) {
    console.log("[EDIT_EXPENSE_ACTION]", error)
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
    await deleteExpenseService(expenseId)

    revalidatePath("/dashboard/expenses")

    return {
      success: true,
      message: "Expense Deleted Successfully",
    }
  } catch (error) {
    console.log("[DELETE_EXPENSE_ACTION]", error)
    return {
      success: false,
      message: "Failed to delete Expense",
    }
  }
}
