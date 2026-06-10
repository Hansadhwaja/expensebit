import PageHeader from "@/components/common/Header/PageHeader"
import AddExpenseModal from "@/components/expense/Modal/AddExpenseModal"
import { getCategoriesAction } from "@/lib/actions/category.actions"

const DashboardPage = async () => {
  const categoriesResponse = await getCategoriesAction()

  const categories = categoriesResponse.data?.categories ?? []
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Welcome Back John 👋.Here's your Financial overview."
        others={
          <div>
            <AddExpenseModal categories={categories} />
          </div>
        }
      />
    </div>
  )
}

export default DashboardPage
