export type AnalyticsData = {
  spendingChartData: SpendingData[]
  categoryChartData: CategoryData[]
  paymentMethodData: PaymentData[]
  transactionFrequencyData: TransactionData[]
}

export type SpendingData = {
  label: string
  amount: number
}

export type CategoryData = {
  category: string
  amount: number
}

export type PaymentData = {
  method: string
  amount: number
}

export type TransactionData = {
  day: string
  count: number
}
