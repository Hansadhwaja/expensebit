"use client"

import CategoryFilters from "./CategoryFilters"
import { Filter, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Category } from "@/lib/types/category.types"
import { Button } from "@/components/ui/button"
import { useQueryParam } from "@/hooks/useQueryParam"
import PaymentFilters from "./PaymentFilters"
import DateRangeFilters from "./DateRangeFilters"
import { Separator } from "@/components/ui/separator"

interface Props {
  categories: Category[]
}

const ExpenseFilters = ({ categories }: Props) => {
  const { clearParams } = useQueryParam()

  const handleReset = () => {
    clearParams()
  }
  return (
    <Card>
      <CardContent className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Filter className="size-4" />
          Filters
        </div>

        <Separator orientation="vertical" />

        <CategoryFilters categories={categories ?? []} />
        <PaymentFilters />
        <DateRangeFilters />
        <Button onClick={handleReset} variant="outline">
          <X />
          Reset
        </Button>
      </CardContent>
    </Card>
  )
}

export default ExpenseFilters
