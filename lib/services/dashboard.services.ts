"use server";

import connectDB from "../db";
import { DashboardSummary } from "../types/dashboard.types";
import { getTotalCategories } from "./category.services";
import { getCurrentMonthExpenses, getRecentExpenses, getTodayExpenses, getTotalExpense } from "./expense.services";

export async function getDashboardSummaryService(userId: string): Promise<DashboardSummary> {
    await connectDB();

    const [
        totalExpenses,
        currentMonthExpenses,
        todayExpenses,
        totalCategories,
        recentExpenses
    ] = await Promise.all([
        getTotalExpense(userId),
        getCurrentMonthExpenses(userId),
        getTodayExpenses(userId),
        getTotalCategories(),
        getRecentExpenses({ userId, limit: 10 })
    ]);

    return {
        totalExpenses,
        currentMonthExpenses,
        todayExpenses,
        totalCategories,
        recentExpenses
    }
}





