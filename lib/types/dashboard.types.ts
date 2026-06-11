import { Expense } from "./expense.types";

export type DashboardSummary = {
    totalExpenses: number;
    currentMonthExpenses: number;
    todayExpenses: number;
    totalCategories: number;
    recentExpenses: Expense[];
}