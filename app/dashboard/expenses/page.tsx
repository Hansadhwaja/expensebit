import PageHeader from '@/components/common/Header/PageHeader'
import AddExpenseModal from '@/components/expense/Modal/AddExpenseModal'
import ExpenseTable from '@/components/expense/Table/ExpenseTable'
import { ExpenseProvider } from '@/features/context/ExpenseProvider';
import { getCategoriesAction } from '@/lib/actions/category.actions';
import { getExpensesAction } from '@/lib/actions/expense.actions';

const ExpensesPage = async () => {
    const [expenseResponse, categoriesResponse] = await Promise.all([
        getExpensesAction(),
        getCategoriesAction()
    ]);

    const expenses = expenseResponse.data?.expenses ?? [];
    const categories = categoriesResponse.data?.categories ?? [];
    return (
        <div className='space-y-4'>
            <PageHeader
                title="Expenses"
                description="Monitor business spending and maintain accurate financial records."
                others={<AddExpenseModal categories={categories} />}
            />
            <ExpenseProvider categories={categories}>
                <ExpenseTable expenses={expenses} />
            </ExpenseProvider>

        </div>
    )
}

export default ExpensesPage