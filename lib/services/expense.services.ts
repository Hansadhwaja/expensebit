"use server";

import connectDB from "../db";
import Expense from "../models/Expense.model";
import { ExpenseFormValues } from "../schemas/expense.schemas";
import { Expense as ExpenseType } from "@/lib/types/expense.types";


export async function createExpenseService(
    data: ExpenseFormValues & { userId: string }
): Promise<{ id: string }> {
    try {

        await connectDB();
        const expense = await Expense.create(data);
        if (!expense) {
            throw new Error("Error creating Expense")
        }

        return {
            id: expense._id.toString(),
        };
    } catch (error) {
        console.log("[CREATE_EXPENSE_SERVICE]", error);
        throw new Error(error instanceof Error ? error.message : "Error creating Expense")
    }
}

export async function getExpensesService(): Promise<ExpenseType[]> {
    try {
        await connectDB();
        const expenses = await Expense
            .find({})
            .populate("category", "name color icon")
            .sort({ date: -1 })
            .lean();

        if (!expenses) {
            throw new Error("Failed to fetch expenses");
        }

        return expenses.map(e => ({
            ...e,
            _id: e._id.toString(),
            category: e.category ? {
                ...e.category,
                _id: e.category._id.toString()
            } : null
        }))


    } catch (error) {
        console.log("[GET_EXPENSES_SERVICE]", error);
        throw new Error(error instanceof Error ? error.message : 'Error while fetching all expenses')
    }
}

export async function editExpenseService({
    data,
    expenseId
}: {
    data: ExpenseFormValues & { userId: string },
    expenseId: string
}): Promise<void> {
    try {

        await connectDB();
        const updatedExpense = await Expense.findByIdAndUpdate(expenseId, data, {
            new: true,
            runValidators: true
        });
        if (!updatedExpense) {
            throw new Error("Expense Not Found")
        }
    } catch (error) {
        console.log("[EDIT_EXPENSE_SERVICE]", error);
        throw new Error(error instanceof Error ? error.message : "Error while editing Expense")
    }
}

export async function deleteExpenseService(
    expenseId: string
): Promise<void> {
    try {
        await connectDB();
        const deletedExpense = await Expense.findByIdAndDelete(expenseId);
        if (!deletedExpense) {
            throw new Error("Expense Not Found")
        }
    } catch (error) {
        console.log("[DELETE_EXPENSE_SERVICE]", error);
        throw new Error(error instanceof Error ? error.message : "Error while deleting Expense")
    }
}

export async function getTotalExpense(userId: string): Promise<number> {
    await connectDB();

    const result = await Expense.aggregate([
        {
            $match: {
                userId
            }
        },
        {
            $group: {
                _id: null,
                total: {
                    $sum: "$amount"
                }
            }
        }
    ]);

    return result[0]?.total ?? 0;
}

export async function getCurrentMonthExpenses(userId: string): Promise<number> {
    await connectDB();
    const date = new Date();

    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const startOfNextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);

    const result = await Expense.aggregate([
        {
            $match: {
                userId,
                date: {
                    $gte: startOfMonth,
                    $lt: startOfNextMonth
                }
            },
        },
        {
            $group: {
                _id: null,
                total: {
                    $sum: "$amount"
                }
            }
        }
    ]);

    return result[0]?.total ?? 0;
}

export async function getTodayExpenses(userId: string): Promise<number> {
    await connectDB();

    const date = new Date();

    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const startOfNextDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

    const result = await Expense.aggregate([
        {
            $match: {
                userId,
                date: {
                    $gte: startOfDay,
                    $lt: startOfNextDay
                }
            }
        },
        {
            $group: {
                _id: null,
                total: {
                    $sum: "$amount"
                }
            }
        }
    ]);

    return result[0]?.total ?? 0;
}

export async function getRecentExpenses({
    userId,
    limit = 10
}: {
    userId: string,
    limit: number
}): Promise<ExpenseType[]> {
    await connectDB();
    const expenses = await Expense
        .find({ userId })
        .populate("category", "name color icon")
        .sort({ date: -1 })
        .limit(limit)
        .lean();

    return expenses.map(expense => ({
        ...expense,
        _id: expense._id.toString(),
        category: expense.category ? {
            ...expense.category,
            _id: expense.category._id.toString()
        } : null
    }));
}