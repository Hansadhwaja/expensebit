"use server"

import connectDB from "../db"
import Expense from "../models/Expense.model"
import { ExpenseFormValues, ExpenseQueryType } from "../schemas/expense.schemas"
import { ExpenseQuery, Expense as ExpenseType } from "@/lib/types/expense.types"
import { Pagination } from "../types"

import { SortOrder } from "mongoose"
import {
  CategoryData,
  PaymentData,
  SpendingData,
  TransactionData,
} from "../types/analytics.types"
import { getDateRange } from "../utils"
import { MONTHS, WeekDays } from "@/constants"

const sortMap: Record<string, Record<string, SortOrder>> = {
  latest: { date: -1 },
  oldest: { date: 1 },
  amount_desc: { amount: -1 },
  amount_asc: { amount: 1 },
}

const getSortOption = (sort: string) => sortMap[sort] ?? sortMap.latest

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
  sort,
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

    const sortOption = getSortOption(sort)

    const [expenses, totalCount] = await Promise.all([
      Expense.find(query)
        .populate("category", "name color icon")
        .sort(sortOption)
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

//Dashboard and Analytics
export async function getTotalExpense(userId: string): Promise<number> {
  await connectDB()

  const result = await Expense.aggregate([
    {
      $match: {
        userId,
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$amount",
        },
      },
    },
  ])

  return result[0]?.total ?? 0
}

export async function getCurrentMonthExpenses(userId: string): Promise<number> {
  await connectDB()
  const date = new Date()

  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
  const startOfNextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1)

  const result = await Expense.aggregate([
    {
      $match: {
        userId,
        date: {
          $gte: startOfMonth,
          $lt: startOfNextMonth,
        },
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$amount",
        },
      },
    },
  ])

  return result[0]?.total ?? 0
}

export async function getTodayExpenses(userId: string): Promise<number> {
  await connectDB()

  const date = new Date()

  const startOfDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  )
  const startOfNextDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1
  )

  const result = await Expense.aggregate([
    {
      $match: {
        userId,
        date: {
          $gte: startOfDay,
          $lt: startOfNextDay,
        },
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$amount",
        },
      },
    },
  ])

  return result[0]?.total ?? 0
}

export async function getRecentExpenses({
  userId,
  limit = 10,
}: {
  userId: string
  limit: number
}): Promise<ExpenseType[]> {
  await connectDB()
  const expenses = await Expense.find({ userId })
    .populate("category", "name color icon")
    .sort({ date: -1 })
    .limit(limit)
    .lean()

  return expenses.map((expense) => ({
    ...expense,
    _id: expense._id.toString(),
    category: expense.category
      ? {
          ...expense.category,
          _id: expense.category._id.toString(),
        }
      : null,
  }))
}

export async function getDailyExpenses({
  startDate,
  endDate,
  userId,
}: {
  startDate: string
  endDate: string
  userId: string
}): Promise<SpendingData[]> {
  await connectDB()
  const { startRange, endRange } = getDateRange(startDate, endDate)

  const result = await Expense.aggregate([
    {
      $match: {
        userId,
        date: {
          $gte: startRange,
          $lte: endRange,
        },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$date",
          },
        },
        amount: {
          $sum: "$amount",
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
    {
      $project: {
        _id: 0,
        label: "$_id",
        amount: 1,
      },
    },
  ])

  return result
}

export async function getWeeklyExpenses({
  startDate,
  endDate,
  userId,
}: {
  startDate: string
  endDate: string
  userId: string
}): Promise<SpendingData[]> {
  await connectDB()
  const { startRange, endRange } = getDateRange(startDate, endDate)

  const result = await Expense.aggregate([
    {
      $match: {
        userId,
        date: {
          $gte: startRange,
          $lte: endRange,
        },
      },
    },
    {
      $group: {
        _id: {
          year: {
            $isoWeekYear: "$date",
          },
          week: {
            $isoWeek: "$date",
          },
        },
        amount: {
          $sum: "$amount",
        },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.week": 1,
      },
    },
    {
      $project: {
        _id: 0,
        label: {
          $concat: [
            "Week ",
            {
              $toString: "$_id.week",
            },
            ", ",
            {
              $toString: "$_id.year",
            },
          ],
        },
        amount: 1,
      },
    },
  ])

  return result
}

export async function getMonthlyExpenses({
  startDate,
  endDate,
  userId,
}: {
  startDate: string
  endDate: string
  userId: string
}): Promise<SpendingData[]> {
  await connectDB()
  const start = new Date(startDate)
  const end = new Date(endDate)

  const startRange = new Date(start.getFullYear(), start.getMonth(), 1)
  const endRange = new Date(end.getFullYear(), end.getMonth() + 1, 1)

  const result = await Expense.aggregate([
    {
      $match: {
        userId,
        date: {
          $gte: startRange,
          $lte: endRange,
        },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
        },
        amount: {
          $sum: "$amount",
        },
      },
    },
    {
      $sort: { "_id.year": 1, "_id:month": 1 },
    },
    {
      $project: {
        _id: 0,
        month: "$_id.month",
        year: "$_id.year",
        amount: 1,
      },
    },
  ])

  const monthlyExpenses = result.map((item) => ({
    label: `${MONTHS[item.month - 1]} ${item.year}`,
    amount: item.amount,
  }))

  return monthlyExpenses
}

export async function getPaymentMethodWiseExpenses(
  userId: string
): Promise<PaymentData[]> {
  await connectDB()

  const result = await Expense.aggregate([
    {
      $match: {
        userId,
      },
    },
    {
      $group: {
        _id: "$paymentMethod",
        amount: {
          $sum: "$amount",
        },
      },
    },
    {
      $project: {
        _id: 0,
        method: "$_id",
        amount: 1,
      },
    },
  ])

  return result.map((item) => ({
    ...item,
    method: item.method.toUpperCase(),
  }))
}

export async function getCategoryWiseExpenses(
  userId: string
): Promise<CategoryData[]> {
  await connectDB()

  const result = await Expense.aggregate([
    {
      $match: {
        userId,
      },
    },
    {
      $group: {
        _id: "$category",
        amount: {
          $sum: "$amount",
        },
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $unwind: "$category",
    },
    {
      $project: {
        _id: 0,
        category: "$category.name",
        amount: 1,
      },
    },
  ])

  return result
}

export async function getTotalExpensesByWeekDays({
  startDate,
  endDate,
  userId,
}: {
  startDate: string
  endDate: string
  userId: string
}): Promise<TransactionData[]> {
  await connectDB()
  const { startRange, endRange } = getDateRange(startDate, endDate)

  const result = await Expense.aggregate([
    {
      $match: {
        userId,
        date: {
          $gte: startRange,
          $lte: endRange,
        },
      },
    },
    {
      $group: {
        _id: {
          $dayOfWeek: "$date",
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
    {
      $project: {
        _id: 0,
        day: "$_id",
        count: 1,
      },
    },
  ])

  const transactionFrequencyData = result.map((item) => ({
    day: WeekDays[item.day - 1],
    count: item.count,
  }))

  return transactionFrequencyData
}
