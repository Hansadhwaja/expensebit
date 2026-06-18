import {
  analyticsQuerySchema,
  AnalyticsQueryType,
} from "../schemas/analytics.schemas"

export function validateAnalyticsQueryType(data: AnalyticsQueryType) {
  return analyticsQuerySchema.safeParse(data)
}
