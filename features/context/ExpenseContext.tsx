"use client";

import { Category } from "@/lib/types/category.types";
import { createContext, useContext } from "react";

export const ExpenseContext = createContext<{
    categories: Category[]
} | null>(null);

export const useExpenseContext = () => {
    const ctx = useContext(ExpenseContext);
    if (!ctx) throw new Error("Must be used inside Expense Provider");
    return ctx;
}