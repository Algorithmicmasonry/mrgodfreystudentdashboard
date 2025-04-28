"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { useIsMobile } from "@/hooks/use-mobile"

const data = [
  {
    range: "0.00-1.00",
    count: 2,
  },
  {
    range: "1.01-2.00",
    count: 8,
  },
  {
    range: "2.01-3.00",
    count: 25,
  },
  {
    range: "3.01-3.50",
    count: 35,
  },
  {
    range: "3.51-4.00",
    count: 20,
  },
  {
    range: "4.01-4.50",
    count: 8,
  },
  {
    range: "4.51-5.00",
    count: 2,
  },
]

export function CGPADistribution() {
  const isMobile = useIsMobile()

  return (
    <ResponsiveContainer width="100%" height={isMobile ? 250 : 350}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
        <XAxis
          dataKey="range"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          angle={isMobile ? -45 : 0}
          textAnchor={isMobile ? "end" : "middle"}
          height={60}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
          width={isMobile ? 30 : 40}
        />
        <Tooltip />
        <Bar dataKey="count" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-violet-500" />
      </BarChart>
    </ResponsiveContainer>
  )
}
