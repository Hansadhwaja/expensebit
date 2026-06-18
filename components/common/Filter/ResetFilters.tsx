"use client"

import { Button } from "@/components/ui/button"
import { useQueryParam } from "@/hooks/useQueryParam"
import { X } from "lucide-react"

const ResetFilters = () => {
  const { clearParams } = useQueryParam()

  const handleReset = () => {
    clearParams()
  }

  return (
    <Button onClick={handleReset} variant="outline">
      <X />
      Reset
    </Button>
  )
}

export default ResetFilters
