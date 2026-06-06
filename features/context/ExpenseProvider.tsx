"use client";

import { Category } from "@/lib/types/category.types";
import { ReactNode } from "react";
import { ExpenseContext } from "./ExpenseContext"

export const ExpenseProvider = ({
    categories,
    children
}: {
    categories: Category[],
    children: ReactNode
}) => {
    return (
        <ExpenseContext.Provider value={{ categories }}>
            {children}
        </ExpenseContext.Provider>
    )
}