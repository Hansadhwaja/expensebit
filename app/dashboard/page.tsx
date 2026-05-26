import PageHeader from "@/components/common/Header/PageHeader"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const DashboardPage = () => {
    return (
        <div>
            <PageHeader
                title="Dashboard"
                description="Welcome Back John 👋.Here's your Financial overview."
                others={
                    <div>
                        <Button>
                            <Plus />
                            Add Expense
                        </Button>
                    </div>
                }
            />
        </div>
    )
}

export default DashboardPage