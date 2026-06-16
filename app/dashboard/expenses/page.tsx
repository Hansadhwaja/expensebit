import PageHeader from "@/components/common/Header/PageHeader";
import AddExpenseModal from "@/components/expense/Modal/AddExpenseModal";
import ExpenseTable from "@/components/expense/Table/ExpenseTable";
import { ExpenseProvider } from "@/features/context/ExpenseProvider";
import { getCategoriesAction } from "@/lib/actions/category.actions";
import { getExpensesAction } from "@/lib/actions/expense.actions";

interface Props {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}

const ExpensesPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const page = Number(params.page ?? 1);
  const limit = Number(params.limit ?? 10);

  const [expenseResponse, categoriesResponse] = await Promise.all([
    getExpensesAction({
      page,
      limit,
    }),
    getCategoriesAction(),
  ]);

  const {
    expenses = [],
    pagination = {
      page: 1,
      limit: 10,
      totalPages: 0,
      totalCount: 0,
    },
  } = expenseResponse?.data ?? {};

  const categories =
    categoriesResponse.data?.categories ?? [];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Expenses"
        description="Monitor business spending and maintain accurate financial records."
        others={
          <AddExpenseModal categories={categories} />
        }
      />

      <ExpenseProvider categories={categories}>
        <ExpenseTable
          expenses={expenses}
          pagination={pagination}
        />
      </ExpenseProvider>
    </div>
  );
};

export default ExpensesPage;