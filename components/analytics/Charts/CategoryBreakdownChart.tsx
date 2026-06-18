"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart, Sector } from "recharts"
import type { PieSectorShapeProps } from "recharts/types/polar/Pie"

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
    category: string
    amount: number
  }[]
}

const CategoryBreakdownChart = ({ data }: Props) => {
  const chartData = data.map((item, index) => ({
    ...item,
    fill: `var(--chart-${(index % 5) + 1})`,
  }))

  const chartConfig = Object.fromEntries(
    chartData.map((item) => [
      item.category,
      {
        label: item.category,
        color: item.fill,
      },
    ])
  ) satisfies ChartConfig

  if (!data.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
          <CardDescription>
            Spending distribution across categories
          </CardDescription>
        </CardHeader>

        <CardContent className="flex h-[250px] items-center justify-center text-muted-foreground">
          No expense data available
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Category Breakdown</CardTitle>

        <CardDescription>
          Spending distribution across categories
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <Pie
              aria-label="Expense category breakdown"
              data={chartData}
              dataKey="amount"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
              shape={({
                isActive,
                outerRadius = 0,
                ...props
              }: PieSectorShapeProps) => (
                <Sector
                  {...props}
                  outerRadius={isActive ? outerRadius + 10 : outerRadius}
                />
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium">
          Spending analysis <TrendingUp className="h-4 w-4" />
        </div>

        <div className="text-muted-foreground">
          Based on your expense categories
        </div>
      </CardFooter>
    </Card>
  )
}

export default CategoryBreakdownChart
