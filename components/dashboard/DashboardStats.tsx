import React from "react"
import StatCards from "../common/Stats/StatCards"
import { Wallet, Calendar, CalendarDays, Tags } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface DashboardStatsProps {
  totalExpenses: number
  currentMonthExpenses: number
  todayExpenses: number
  totalCategories: number
}

const DashboardStats = ({
  totalExpenses,
  currentMonthExpenses,
  todayExpenses,
  totalCategories,
}: DashboardStatsProps) => {
  const stats = [
    {
      title: "Total Expenses",
      value: formatCurrency(totalExpenses),
      icon: Wallet,
    },
    {
      title: "This Month",
      value: formatCurrency(currentMonthExpenses),
      icon: Calendar,
    },
    {
      title: "Today",
      value: formatCurrency(todayExpenses),
      icon: CalendarDays,
    },
    {
      title: "Categories",
      value: totalCategories,
      icon: Tags,
    },
  ]

  return <StatCards stats={stats} />
}

export default DashboardStats
