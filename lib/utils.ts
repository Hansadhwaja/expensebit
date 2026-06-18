import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount)
}

export const formatDate = (date: string | Date) => {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date))
}

export const formatDateInput = (date: string | Date) => {
  const val = date ? new Date(date) : new Date()

  if (isNaN(val.getTime())) {
    return new Date().toISOString().split("T")[0]
  }
  return val.toISOString().split("T")[0]
}

export const getDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate)
  const end = new Date(endDate)

  return {
    startRange: new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate()
    ),
    endRange: new Date(
      end.getFullYear(),
      end.getMonth(),
      end.getDate(),
      23,
      59,
      59,
      999
    ),
  }
}
