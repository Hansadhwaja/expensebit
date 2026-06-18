import CategoryBreakdownChart from "@/components/analytics/Charts/CategoryBreakdownChart"
import PaymentMethodChart from "@/components/analytics/Charts/PaymentMethodChart"
import SpendingTrendChart from "@/components/analytics/Charts/SpendingTrendChart"
import TransactionFrequencyChart from "@/components/analytics/Charts/TransactionFrequencyChart"
import AnalyticsFilters from "@/components/analytics/Filters"
import PageHeader from "@/components/common/Header/PageHeader"
import { getAnalyticsDataAction } from "@/lib/actions/analytics.actions"
import { GroupByType } from "@/lib/schemas/analytics.schemas"

interface Props {
  searchParams: Promise<{
    groupBy?: GroupByType
    endDate?: string
    startDate?: string
  }>
}

const AnalyticsPage = async ({ searchParams }: Props) => {
  const params = await searchParams

  const today = new Date()

  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(today.getDate() - 30)

  const groupBy = params.groupBy ?? "day"

  const startDate = params.startDate ?? thirtyDaysAgo.toISOString()

  const endDate = params.endDate ?? today.toISOString()

  const filters = {
    startDate,
    endDate,
    groupBy,
  }

  const analyticsRes = await getAnalyticsDataAction(filters)
  const {
    spendingChartData = [],
    paymentMethodData = [],
    categoryChartData = [],
    transactionFrequencyData = [],
  } = analyticsRes?.data?.analytics ?? {}

  return (
    <div className="space-y-4">
      <PageHeader
        title="Analytics"
        description="Gain insights into your spending patterns, track financial trends, and make informed budgeting decisions."
      />
      <AnalyticsFilters />
      <div className="space-y-6">
        <SpendingTrendChart data={spendingChartData} />

        <div className="grid gap-6 lg:grid-cols-2">
          <PaymentMethodChart data={paymentMethodData} />
          <CategoryBreakdownChart data={categoryChartData} />
        </div>
        <TransactionFrequencyChart data={transactionFrequencyData} />
      </div>
    </div>
  )
}

export default AnalyticsPage
