"use server"

import connectDB from "../db"
import { AnalyticsQueryType } from "../schemas/analytics.schemas"
import { AnalyticsData } from "../types/analytics.types"
import {
  getCategoryWiseExpenses,
  getDailyExpenses,
  getMonthlyExpenses,
  getPaymentMethodWiseExpenses,
  getTotalExpensesByWeekDays,
  getWeeklyExpenses,
} from "./expense.services"

export async function getAnalyticsDataService({
  userId,
  startDate,
  endDate,
  groupBy = "day",
}: AnalyticsQueryType & { userId: string }): Promise<AnalyticsData> {
  await connectDB()

  let spendingChartData = []

  switch (groupBy) {
    case "day": {
      spendingChartData = await getDailyExpenses({ startDate, endDate, userId })
      break
    }
    case "week": {
      spendingChartData = await getWeeklyExpenses({
        startDate,
        endDate,
        userId,
      })
      break
    }
    case "month": {
      spendingChartData = await getMonthlyExpenses({
        startDate,
        endDate,
        userId,
      })
      break
    }
  }

  const paymentMethodData = await getPaymentMethodWiseExpenses(userId)

  const categoryChartData = await getCategoryWiseExpenses(userId)

  const transactionFrequencyData = await getTotalExpensesByWeekDays({
    startDate,
    endDate,
    userId,
  })

  return {
    spendingChartData,
    paymentMethodData,
    categoryChartData,
    transactionFrequencyData
  }
}
