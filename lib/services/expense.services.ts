"use server"

import connectDB from "../db"
import Expense from "../models/Expense.model"
import { ExpenseFormValues, ExpenseQueryType } from "../schemas/expense.schemas"
import { ExpenseQuery, Expense as ExpenseType } from "@/lib/types/expense.types"
import { Pagination } from "../types"

export async function createExpenseService(
  data: ExpenseFormValues & { userId: string }
): Promise<{ id: string }> {
  try {
    await connectDB()
    const expense = await Expense.create(data)
    if (!expense) {
      throw new Error("Error creating Expense")
    }

    return {
      id: expense._id.toString(),
    }
  } catch (error) {
    console.log("[CREATE_EXPENSE_SERVICE]", error)
    throw new Error(
      error instanceof Error ? error.message : "Error creating Expense"
    )
  }
}

export async function getExpensesService({
  page,
  limit,
  search,
  category,
  payment,
  startDate,
  endDate,
  userId,
}: ExpenseQueryType & {
  userId: string
}): Promise<{ expenses: ExpenseType[]; pagination: Pagination }> {
  try {
    await connectDB()

    const skip = (page - 1) * limit
    const query: ExpenseQuery = {
      userId,
    }

    if (search?.trim()) {
      query.title = {
        $regex: search,
        $options: "i",
      }
    }

    if (category) {
      query.category = category
    }

    if (payment) {
      query.paymentMethod = payment
    }

    if (startDate || endDate) {
      query.date = {}
      if (startDate) {
        query.date.$gte = new Date(startDate)
      }

      if (endDate) {
        query.date.$lte = new Date(endDate)
      }
    }

    const [expenses, totalCount] = await Promise.all([
      Expense.find(query)
        .populate("category", "name color icon")
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Expense.countDocuments({
        userId,
      }),
    ])

    return {
      expenses: expenses.map((e) => ({
        ...e,
        _id: e._id.toString(),
        category: e.category
          ? {
              ...e.category,
              _id: e.category._id.toString(),
            }
          : null,
      })),
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
        totalCount,
      },
    }
  } catch (error) {
    console.log("[GET_EXPENSES_SERVICE]", error)
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error while fetching all expenses"
    )
  }
}

export async function editExpenseService({
  data,
  expenseId,
}: {
  data: ExpenseFormValues & { userId: string }
  expenseId: string
}): Promise<void> {
  try {
    await connectDB()
    const updatedExpense = await Expense.findByIdAndUpdate(expenseId, data, {
      new: true,
      runValidators: true,
    })
    if (!updatedExpense) {
      throw new Error("Expense Not Found")
    }
  } catch (error) {
    console.log("[EDIT_EXPENSE_SERVICE]", error)
    throw new Error(
      error instanceof Error ? error.message : "Error while editing Expense"
    )
  }
}

export async function deleteExpenseService(expenseId: string): Promise<void> {
  try {
    await connectDB()
    const deletedExpense = await Expense.findByIdAndDelete(expenseId)
    if (!deletedExpense) {
      throw new Error("Expense Not Found")
    }
  } catch (error) {
    console.log("[DELETE_EXPENSE_SERVICE]", error)
    throw new Error(
      error instanceof Error ? error.message : "Error while deleting Expense"
    )
  }
}
