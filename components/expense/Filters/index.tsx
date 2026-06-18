import CategoryFilters from "./CategoryFilters"
import { Filter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Category } from "@/lib/types/category.types"
import PaymentFilters from "./PaymentFilters"
import { Separator } from "@/components/ui/separator"
import SearchFilters from "@/components/common/Filter/SearchFilters"
import SortFilters from "./SortFilters"
import DateRangeFilters from "@/components/common/Filter/DateRangeFilters"
import ResetFilters from "@/components/common/Filter/ResetFilters"

interface Props {
  categories: Category[]
}

const ExpenseFilters = ({ categories }: Props) => {
  return (
    <Card>
      <CardContent className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Filter className="size-4" />
          Filters
        </div>

        <Separator orientation="vertical" />
        <SearchFilters />
        <CategoryFilters categories={categories ?? []} />
        <PaymentFilters />
        <DateRangeFilters />
        <SortFilters />
        <ResetFilters />
      </CardContent>
    </Card>
  )
}

export default ExpenseFilters
