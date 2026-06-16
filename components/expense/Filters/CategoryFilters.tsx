"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useQueryParam } from "@/hooks/useQueryParam"
import { Category } from "@/lib/types/category.types"

interface Props {
  categories: Category[]
}

const CategoryFilters = ({ categories }: Props) => {
  const { getParam, setMultipleParams } = useQueryParam()
  const selectedCategory = getParam("category") ?? "all"

  const handleSelect = (val: string) => {
    setMultipleParams({
      page: 1,
      category: val,
    })
  }
  return (
    <Select value={selectedCategory} onValueChange={handleSelect}>
      <SelectTrigger>
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        {categories.map((c) => (
          <SelectItem key={c._id} value={c._id}>
            {c.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default CategoryFilters
