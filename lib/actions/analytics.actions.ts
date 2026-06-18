"use server"

import { USER } from "@/constants"
import { AnalyticsQueryType } from "../schemas/analytics.schemas"
import { validateAnalyticsQueryType } from "../validators/analytics.validators"
import { ActionResponse } from "../types"
import { AnalyticsData } from "../types/analytics.types"
import { getAnalyticsDataService } from "../services/analytics.services"

export async function getAnalyticsDataAction(
  params: AnalyticsQueryType
): Promise<ActionResponse<{ analytics: AnalyticsData }>> {
  try {
    const user = USER

    const validatedData = validateAnalyticsQueryType(params)

    if (!validatedData.success) {
      return {
        success: false,
        message: validatedData?.error.issues[0].message ?? "Invalid Query Data",
      }
    }
    const analytics = await getAnalyticsDataService({
      userId: user.id,
      ...validatedData.data,
    })

    return {
      success: true,
      message: "Analytics Data Fetched Successfully",
      data: { analytics },
    }
  } catch (error) {
    console.log("[GET_ANALYTICS_ACTION]", error)
    return {
      success: false,
      message: "Error while fetching analytics data",
    }
  }
}
