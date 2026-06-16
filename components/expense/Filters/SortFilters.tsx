"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { sortOptions } from "@/constants"
import { useQueryParam } from "@/hooks/useQueryParam"

const SortFilters = () => {
  const { getParam, setMultipleParams } = useQueryParam()
  const sort = getParam("sort") ?? sortOptions[0].value

  const handleSelect = (val: string) => {
    setMultipleParams({
      page: 1,
      sort: val,
    })
  }
  return (
    <Select value={sort} onValueChange={handleSelect}>
      <SelectTrigger>
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>

      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SortFilters
