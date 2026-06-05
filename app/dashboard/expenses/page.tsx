import PageHeader from '@/components/common/Header/PageHeader'
import AddExpenseModal from '@/components/expense/Modal/AddExpenseModal'
import ExpenseTable from '@/components/expense/Table/ExpenseTable'
import { getExpensesAction } from '@/lib/actions/expense.actions';

const ExpensesPage = async () => {
    const response = await getExpensesAction();

    const expenses = response.data?.expenses ?? [];

    return (
        <div className='space-y-4'>
            <PageHeader
                title="Expenses"
                description="Monitor business spending and maintain accurate financial records."
                others={<AddExpenseModal />}
            />
            <ExpenseTable expenses={expenses} />
        </div>
    )
}

export default ExpensesPage