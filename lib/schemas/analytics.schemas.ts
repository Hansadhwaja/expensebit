import { groupByOptions } from "@/constants"
import { z } from "zod"

export const analyticsQuerySchema = z
  .object({
    startDate: z.string().min(1, "Start Date Required"),
    endDate: z.string().min(1, "End Date Required"),
    groupBy: z.enum(groupByOptions.map((o) => o.value)).default("day"),
  })
  .refine(
    (data) =>
      !data.startDate || !data.endDate || data.startDate <= data.endDate,
    {
      message: "Start date must be before end date",
      path: ["endDate"],
    }
  )

export type AnalyticsQueryType = z.infer<typeof analyticsQuerySchema>

export type GroupByType = (typeof groupByOptions)[number]["value"]
