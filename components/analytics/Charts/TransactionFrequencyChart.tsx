"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
    day: string
    count: number
  }[]
}

const chartConfig = {
  count: {
    label: "Transactions",
  },
} satisfies ChartConfig

const TransactionFrequencyChart = ({ data }: Props) => {
  const transactionData = data.map((item, index) => ({
    ...item,
    fill: `var(--chart-${(index % 5) + 1})`,
  }))
  if (!data.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction Frequency</CardTitle>

          <CardDescription>
            Number of transactions made on each day of the week
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
        <CardTitle>Transaction Frequency</CardTitle>

        <CardDescription>
          Number of transactions made on each day of the week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart layout="vertical" data={transactionData}>
            <CartesianGrid horizontal={false} />

            <XAxis type="number" hide />

            <YAxis
              dataKey="day"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />

            <ChartTooltip content={<ChartTooltipContent />} />

            <Bar dataKey="count" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground">
          Transaction activity distribution throughout the week.
        </div>
      </CardFooter>
    </Card>
  )
}

export default TransactionFrequencyChart
