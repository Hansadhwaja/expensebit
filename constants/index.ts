import {
    LayoutDashboard,
    Receipt,
    Tags,
    Wallet,
    ChartColumn,
    Repeat,
    FileText,
    Settings,
} from "lucide-react";

export const navLinks = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Expenses",
        href: "/dashboard/expenses",
        icon: Receipt,
    },
    {
        label: "Categories",
        href: "/dashboard/categories",
        icon: Tags,
    },
    {
        label: "Budgets",
        href: "/dashboard/budgets",
        icon: Wallet,
    },
    {
        label: "Analytics",
        href: "/dashboard/analytics",
        icon: ChartColumn,
    },
    {
        label: "Recurring",
        href: "/dashboard/recurring",
        icon: Repeat,
    },
    {
        label: "Reports",
        href: "/dashboard/reports",
        icon: FileText,
    },
    {
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];