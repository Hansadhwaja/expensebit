"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

interface Props {
  data: {
    method: string
    amount: number
  }[]
}

const chartConfig = {
  amount: {
    label: "Amount",
  },
} satisfies ChartConfig

const PaymentMethodChart = ({ data }: Props) => {
  const paymentData = data.map((item, index) => ({
    ...item,
    fill: `var(--chart-${(index % 5) + 1})`,
  }))

  if (!data.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Payment Method Breakdown</CardTitle>
          <CardDescription>
            Spending distribution across payment method
          </CardDescription>
        </CardHeader>

        <CardContent className="flex h-[250px] items-center justify-center text-muted-foreground">
          No expense data available
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method Breakdown</CardTitle>
        <CardDescription>
          Spending distribution across payment methods
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={paymentData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="method"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="amount" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground">
          Payment method usage across all recorded expenses.
        </div>
      </CardFooter>
    </Card>
  )
}

export default PaymentMethodChart
