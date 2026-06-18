"use client"

import { Input } from "@/components/ui/input"
import { useQueryParam } from "@/hooks/useQueryParam"

const DateRangeFilters = () => {
  const { getParam, setMultipleParams } = useQueryParam()

  const startDate = getParam("startDate")
  const endDate = getParam("endDate")

  const handleStartDate = (val: string) => {
    setMultipleParams({
      page: 1,
      startDate: val || null,
    })
  }

  const handleEndDate = (val: string) => {
    setMultipleParams({
      page: 1,
      endDate: val || null,
    })
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Input
        type="date"
        value={startDate ?? ""}
        max={endDate ?? undefined}
        onChange={(e) => handleStartDate(e.target.value)}
        className="w-fit"
      />

      <span className="text-sm text-muted-foreground">to</span>

      <Input
        type="date"
        value={endDate ?? ""}
        min={startDate ?? undefined}
        onChange={(e) => handleEndDate(e.target.value)}
        className="w-fit"
      />
    </div>
  )
}

export default DateRangeFilters
