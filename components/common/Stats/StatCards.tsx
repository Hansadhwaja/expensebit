import React from "react"
import StatCard, { StatCardProps } from "./StatCard"

interface Props {
  stats: StatCardProps[]
}

const StatCards = ({ stats }: Props) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}

export default StatCards
