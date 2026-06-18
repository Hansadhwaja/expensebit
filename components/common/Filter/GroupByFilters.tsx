"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { groupByOptions } from "@/constants"
import { useQueryParam } from "@/hooks/useQueryParam"

const GroupByFilters = () => {
  const { getParam, setParam } = useQueryParam()
  const groupBy = getParam("groupBy") ?? "day"

  const handleSelect = (val: string) => {
    setParam("groupBy", val)
  }

  return (
    <Select value={groupBy} onValueChange={handleSelect}>
      <SelectTrigger>
        <SelectValue placeholder="Select Group" />
      </SelectTrigger>
      <SelectContent>
        {groupByOptions.map((g) => (
          <SelectItem key={g.value} value={g.value}>
            {g.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default GroupByFilters
