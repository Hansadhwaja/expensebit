"use client"

import { useQueryParam } from "@/hooks/useQueryParam"
import IconInput from "../Input/IconInput"
import { Search } from "lucide-react"
import { useDebouncedCallback } from "use-debounce"

const SearchFilters = () => {
  const { getParam, setMultipleParams } = useQueryParam()
  const search = getParam("search") ?? ""

  const handleSearch = useDebouncedCallback((val: string) => {
    setMultipleParams({
      page: 1,
      search: val,
    })
  }, 500)

  return (
    <IconInput
      key={search}
      Icon={Search}
      defaultValue={search}
      onChange={handleSearch}
    />
  )
}

export default SearchFilters
