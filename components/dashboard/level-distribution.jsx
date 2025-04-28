"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { useIsMobile } from "@/hooks/use-mobile"

const data = [
  { name: "100 Level", value: 30, color: "#60a5fa" },
  { name: "200 Level", value: 25, color: "#4ade80" },
  { name: "300 Level", value: 23, color: "#f97316" },
  { name: "400 Level", value: 22, color: "#8b5cf6" },
]

export function LevelDistribution() {
  const isMobile = useIsMobile()

  return (
    <ResponsiveContainer width="100%" height={isMobile ? 250 : 350}>
      <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={isMobile ? 60 : 80}
          fill="#8884d8"
          dataKey="value"
          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout={isMobile ? "horizontal" : "vertical"} verticalAlign="bottom" align="center" />
      </PieChart>
    </ResponsiveContainer>
  )
}
