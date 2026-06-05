"use server";

import connectDB from "../db";
import Expense from "../models/Expense.model";
import { ExpenseFormValues } from "../schemas/expense.schemas";
import { Expense as ExpenseType } from "@/types/expense.types";


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
        throw new Error("Error creating Expense")
    }
}

export async function getExpensesService(): Promise<ExpenseType[]> {
    try {
        await connectDB();
        const expenses = await Expense
            .find({})
            .sort({ date: -1 })
            .lean();

        if (!expenses) {
            throw new Error("Failed to fetch expenses");
        }

        return expenses.map(e => ({
            ...e,
            _id: e._id.toString(),
        }))


    } catch (error) {
        console.log("[GET_EXPENSES_SERVICE]", error);
        throw new Error('Error while fetching all expenses')
    }
}