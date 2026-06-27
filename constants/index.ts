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
  ShoppingCart,
  Gamepad2,
  Banknote,
  Wifi,
} from "lucide-react"

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
]

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
]

export const USER = {
  id: "123",
  name: "User",
}

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
]

export const categoryColors = [
  {
    value: "red",
    label: "Red",
    class: "bg-red-500",
  },
  {
    value: "blue",
    label: "Blue",
    class: "bg-blue-500",
  },
  {
    value: "green",
    label: "Green",
    class: "bg-green-500",
  },
  {
    value: "yellow",
    label: "Yellow",
    class: "bg-yellow-500",
  },
  {
    value: "purple",
    label: "Purple",
    class: "bg-purple-500",
  },
  {
    value: "pink",
    label: "Pink",
    class: "bg-pink-500",
  },
  {
    value: "orange",
    label: "Orange",
    class: "bg-orange-500",
  },
  {
    value: "gray",
    label: "Gray",
    class: "bg-gray-500",
  },
] as const

export const categoryIcons = [
  {
    value: "shopping",
    label: "Shopping",
    icon: ShoppingCart,
  },
  {
    value: "food",
    label: "Food",
    icon: Utensils,
  },
  {
    value: "transport",
    label: "Transport",
    icon: Car,
  },
  {
    value: "home",
    label: "Home",
    icon: Home,
  },
  {
    value: "business",
    label: "Business",
    icon: Briefcase,
  },
  {
    value: "health",
    label: "Health",
    icon: HeartPulse,
  },
  {
    value: "entertainment",
    label: "Entertainment",
    icon: Gamepad2,
  },
  {
    value: "education",
    label: "Education",
    icon: GraduationCap,
  },
  {
    value: "finance",
    label: "Finance",
    icon: Banknote,
  },
  {
    value: "internet",
    label: "Internet",
    icon: Wifi,
  },
] as const

export const sortOptions = [
  {
    label: "Latest First",
    value: "latest",
  },
  {
    label: "Oldest First",
    value: "oldest",
  },
  {
    label: "Amount High → Low",
    value: "amount_desc",
  },
  {
    label: "Amount Low → High",
    value: "amount_asc",
  },
] as const

export const groupByOptions = [
  {
    label: "Day",
    value: "day",
  },
  {
    label: "Week",
    value: "week",
  },
  {
    label: "Month",
    value: "month",
  },
] as const

export const PERIODS = [
  {
    label: "Today",
    value: "today",
  },
  {
    label: "Yesterday",
    value: "yesterday",
  },
  {
    label: "Last 7 Days",
    value: "7d",
  },
  {
    label: "Last 30 Days",
    value: "30d",
  },
  {
    label: "This Month",
    value: "month",
  },
  {
    label: "This Year",
    value: "year",
  },
]

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

export const WeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export const CURRENCIES = ["INR", "USD", "EUR", "AED"] as const
