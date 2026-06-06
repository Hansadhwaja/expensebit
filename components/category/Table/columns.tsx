"use client";

import { categoryColors, categoryIcons } from "@/constants";
import { Category } from "@/lib/types/category.types";
import { ColumnDef } from "@tanstack/react-table";
import CategoryActions from "./CategoryActions";

export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "color",
        header: "Color",
        cell: ({ row }) => {
            const color = categoryColors.find(c => c.value == row.getValue("color"));
            return color ? (
                <div className="flex gap-1 items-center">
                    <div className={`w-3 h-3 rounded-full ${color.class}`} />
                    {color?.label}
                </div>
            ) : "-"
        }
    },
    {
        accessorKey: "icon",
        header: "Icon",
        cell: ({ row }) => {
            const icon = categoryIcons.find(i => i.value == row.getValue("icon"));
            return icon ?
                <div className="flex gap-1 items-center">
                    <icon.icon className="w-4 h-4 mr-2" />
                    {icon.label}
                </div> : "-"
        }
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => (
            <CategoryActions category={row.original} />
        ),
    },
];