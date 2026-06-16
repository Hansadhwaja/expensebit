"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { paymentMethods } from "@/constants"
import { useQueryParam } from "@/hooks/useQueryParam"

const PaymentFilters = () => {
  const { getParam, setMultipleParams } = useQueryParam()
  const payment = getParam("payment") ?? "all"

  const handleSelect = (val: string) => {
    setMultipleParams({
      page: 1,
      payment: val,
    })
  }
  return (
    <Select value={payment} onValueChange={handleSelect}>
      <SelectTrigger>
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All PaymentMethod</SelectItem>
        {paymentMethods.map((p) => (
          <SelectItem key={p.value} value={p.value}>
            {p.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default PaymentFilters
