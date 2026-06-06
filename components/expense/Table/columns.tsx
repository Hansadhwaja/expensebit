"use client";

import { categoryColors, categoryIcons, paymentMethods } from "@/constants";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Expense } from "@/lib/types/expense.types";
import { ColumnDef } from "@tanstack/react-table";
import ExpenseActions from "./ExpenseActions";
import { Category } from "@/lib/types/category.types";
import { Badge } from "@/components/ui/badge";
import { CategoryBadge } from "@/components/common/Badge/CategoryBadge";

export const columns: ColumnDef<Expense>[] = [
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => formatDate(row.getValue("date"))
    },
    {
        accessorKey: "title",
        header: "Title"
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => {
            const category = row.getValue("category") as Category;
            return category ? (
                <CategoryBadge category={category} />
            ) : "-";
        }
    },
    {
        accessorKey: "paymentMethod",
        header: "Payment",
        cell: ({ row }) => {
            const payment = paymentMethods.find(p => p.value == row.getValue("paymentMethod"));
            return payment ? <p className="uppercase">{payment.label}</p> : "-"
        }
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => (
            <div className="text-right font-medium text-destructive">{formatCurrency(row.getValue("amount"))}</div>
        ),
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => (
            <ExpenseActions expense={row.original} />
        ),
    },
];