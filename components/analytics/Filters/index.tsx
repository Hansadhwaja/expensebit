import { Card, CardContent } from "@/components/ui/card"
import { Filter } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import DateRangeFilters from "@/components/common/Filter/DateRangeFilters"
import ResetFilters from "@/components/common/Filter/ResetFilters"
import GroupByFilters from "@/components/common/Filter/GroupByFilters"

const AnalyticsFilters = () => {
  return (
    <Card>
      <CardContent className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Filter className="size-4" />
          Date Range
        </div>

        <Separator orientation="vertical" />
        <DateRangeFilters />
        <GroupByFilters />
        <ResetFilters />
      </CardContent>
    </Card>
  )
}

export default AnalyticsFilters
