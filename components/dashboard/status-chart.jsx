"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { useIsMobile } from "@/hooks/use-mobile"

const data = [
  { name: "Active", value: 85, color: "#4ade80" },
  { name: "Graduated", value: 8, color: "#60a5fa" },
  { name: "Suspended", value: 4, color: "#f97316" },
  { name: "Dropped out", value: 3, color: "#f43f5e" },
]

export function StatusChart() {
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
          label={({ name, percent }) =>
            isMobile ? `${(percent * 100).toFixed(0)}%` : `${name} ${(percent * 100).toFixed(0)}%`
          }
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
