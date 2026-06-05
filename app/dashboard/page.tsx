import PageHeader from "@/components/common/Header/PageHeader"
import AddExpenseModal from "@/components/expense/Modal/AddExpenseModal"


const DashboardPage = async () => {
    return (
        <div>
            <PageHeader
                title="Dashboard"
                description="Welcome Back John 👋.Here's your Financial overview."
                others={
                    <div>
                        <AddExpenseModal />
                    </div>
                }
            />
        </div>
    )
}

export default DashboardPage