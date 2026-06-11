import PageHeader from "@/components/common/Header/PageHeader"
import DashboardInsights from "@/components/dashboard/DashboardInsights"
import DashboardStats from "@/components/dashboard/DashboardStats"
import AddExpenseModal from "@/components/expense/Modal/AddExpenseModal"
import ExpenseTable from "@/components/expense/Table/ExpenseTable"
import { getCategoriesAction } from "@/lib/actions/category.actions"
import { getDashboardSummaryAction } from "@/lib/actions/dashboard.actions"

const DashboardPage = async () => {
  const [categoriesResponse, dashboardResponse] = await Promise.all([
    getCategoriesAction(),
    getDashboardSummaryAction(),
  ])

  const categories = categoriesResponse.data?.categories ?? []
  const dashboard = dashboardResponse?.data?.summary

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome Back John 👋.Here's your Financial overview."
        others={
          <div>
            <AddExpenseModal categories={categories} />
          </div>
        }
      />
      <DashboardStats
        totalExpenses={dashboard?.totalExpenses ?? 0}
        currentMonthExpenses={dashboard?.currentMonthExpenses ?? 0}
        todayExpenses={dashboard?.todayExpenses ?? 0}
        totalCategories={dashboard?.totalCategories ?? 0}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ExpenseTable expenses={dashboard?.recentExpenses ?? []} />
        </div>
        <DashboardInsights
          totalExpenses={dashboard?.totalExpenses ?? 0}
          currentMonthExpenses={dashboard?.currentMonthExpenses ?? 0}
          todayExpenses={dashboard?.todayExpenses ?? 0}
          totalCategories={dashboard?.totalCategories ?? 0}
        />
      </div>
    </div>
  )
}

export default DashboardPage
