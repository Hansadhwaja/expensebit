"use client";

import { categories, paymentMethods } from "@/constants";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Expense } from "@/types/expense.types";
import { ColumnDef } from "@tanstack/react-table";

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
            const category = categories.find(c => c.value == row.getValue("category"));
            return category ? category?.label : "-"
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
];