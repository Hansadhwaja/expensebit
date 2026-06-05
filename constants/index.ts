import {
    LayoutDashboard,
    Receipt,
    Tags,
    Wallet,
    ChartColumn,
    Repeat,
    FileText,
    Settings,
    Utensils,
    Car,
    ShoppingBag,
    Home,
    HeartPulse,
    GraduationCap,
    Smartphone,
    Briefcase,
    Film,
    Gift,
    CreditCard,
    Landmark,
    CircleEllipsis,
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

export const paymentMethods = [
    {
        label: "Cash",
        value: "cash",
        icon: Wallet,
    },
    {
        label: "UPI",
        value: "upi",
        icon: Smartphone,
    },
    {
        label: "Card",
        value: "card",
        icon: CreditCard,
    },
    {
        label: "Bank Transfer",
        value: "bank",
        icon: Landmark,
    },
    {
        label: "Other",
        value: "other",
        icon: CircleEllipsis,
    },
];

export const USER = {
    id: "123",
    name: "User",
};

export const categories = [
    {
        label: "Food & Dining",
        value: "food",
        icon: Utensils,
    },
    {
        label: "Travel",
        value: "travel",
        icon: Car,
    },
    {
        label: "Shopping",
        value: "shopping",
        icon: ShoppingBag,
    },
    {
        label: "Housing",
        value: "housing",
        icon: Home,
    },
    {
        label: "Bills & Utilities",
        value: "utilities",
        icon: Receipt,
    },
    {
        label: "Healthcare",
        value: "healthcare",
        icon: HeartPulse,
    },
    {
        label: "Education",
        value: "education",
        icon: GraduationCap,
    },
    {
        label: "Mobile & Internet",
        value: "internet",
        icon: Smartphone,
    },
    {
        label: "Business",
        value: "business",
        icon: Briefcase,
    },
    {
        label: "Entertainment",
        value: "entertainment",
        icon: Film,
    },
    {
        label: "Gifts & Donations",
        value: "gifts",
        icon: Gift,
    },
    {
        label: "Other",
        value: "other",
        icon: Wallet,
    },
];

