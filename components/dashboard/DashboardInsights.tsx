import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"

interface DashboardInsightsProps {
  totalExpenses: number
  currentMonthExpenses: number
  todayExpenses: number
  totalCategories: number
}

const DashboardInsights = ({
  totalExpenses,
  currentMonthExpenses,
  todayExpenses,
  totalCategories,
}: DashboardInsightsProps) => {
  const insights = [
    {
      title: "Total Expenses",
      value: formatCurrency(totalExpenses),
    },
    {
      title: "This Month",
      value: formatCurrency(currentMonthExpenses),
    },
    {
      title: "Today's Spending",
      value: formatCurrency(todayExpenses),
    },
    {
      title: "Categories",
      value: totalCategories,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Insights</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {insights.map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between border-b pb-2 last:border-none"
          >
            <span className="text-sm text-muted-foreground">{item.title}</span>

            <span className="font-semibold">{item.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default DashboardInsights
