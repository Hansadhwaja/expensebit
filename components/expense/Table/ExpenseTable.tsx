import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'
import { Expense } from '@/lib/types/expense.types'
interface Props {
    expenses: Expense[];
}

const ExpenseTable = ({ expenses = [] }: Props) => {
    return (
        <div>
            <DataTable columns={columns} data={expenses} />
        </div>
    )
}

export default ExpenseTable