import PageHeader from "@/components/common/Header/PageHeader"
import ExpenseFilters from "@/components/expense/Filters"
import AddExpenseModal from "@/components/expense/Modal/AddExpenseModal"
import ExpenseTable from "@/components/expense/Table/ExpenseTable"
import { sortOptions } from "@/constants"
import { ExpenseProvider } from "@/features/context/ExpenseProvider"
import { getCategoriesAction } from "@/lib/actions/category.actions"
import { getExpensesAction } from "@/lib/actions/expense.actions"

interface Props {
  searchParams: Promise<{
    page?: string
    limit?: string
    category?: string
    payment?: string
    endDate?: string
    startDate?: string
    search?: string
    sort: string
  }>
}

const ExpensesPage = async ({ searchParams }: Props) => {
  const params = await searchParams

  const page = Number(params.page ?? 1)
  const limit = Number(params.limit ?? 10)
  const category = params.category ?? "all"
  const payment = params.payment ?? "all"
  const startDate = params.startDate
  const endDate = params.endDate
  const search = params.search
  const sort = params.sort ?? sortOptions[0].value

  const filters = {
    page,
    limit,
    category: category === "all" ? undefined : category,
    payment: payment === "all" ? undefined : payment,
    startDate,
    endDate,
    search,
    sort,
  }

  const [expenseResponse, categoriesResponse] = await Promise.all([
    getExpensesAction(filters),
    getCategoriesAction(),
  ])

  const {
    expenses = [],
    pagination = {
      page: 1,
      limit: 10,
      totalPages: 0,
      totalCount: 0,
    },
  } = expenseResponse?.data ?? {}

  const categories = categoriesResponse.data?.categories ?? []

  return (
    <div className="space-y-4">
      <PageHeader
        title="Expenses"
        description="Monitor business spending and maintain accurate financial records."
        others={<AddExpenseModal categories={categories} />}
      />

      <ExpenseFilters categories={categories} />
      <ExpenseProvider categories={categories}>
        <ExpenseTable expenses={expenses} pagination={pagination} />
      </ExpenseProvider>
    </div>
  )
}

export default ExpensesPage
