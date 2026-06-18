"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PERIODS } from "@/constants"
import { useQueryParam } from "@/hooks/useQueryParam"

const DateRangePeriodFilters = () => {
  const { getParam, setParam } = useQueryParam()

  const period = getParam("period") ?? "today"

  const handlePeriod = (value: string) => {
    setParam("period", value)
  }

  return (
    <Select value={period} onValueChange={handlePeriod}>
      <SelectTrigger>
        <SelectValue placeholder="Select period" />
      </SelectTrigger>

      <SelectContent>
        {PERIODS.map((period) => (
          <SelectItem key={period.value} value={period.value}>
            {period.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default DateRangePeriodFilters
