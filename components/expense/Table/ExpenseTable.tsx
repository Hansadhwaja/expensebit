import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { Expense } from "@/lib/types/expense.types"
import AppPagination from "@/components/common/Pagination/AppPagination"
import { Pagination } from "@/lib/types"
interface Props {
  expenses: Expense[]
  pagination: Pagination
}

const ExpenseTable = ({ expenses = [], pagination }: Props) => {
  return (
    <div>
      <DataTable columns={columns} data={expenses} />
      <AppPagination
        totalPages={pagination.totalPages}
        totalCount={pagination.totalCount}
      />
    </div>
  )
}

export default ExpenseTable
