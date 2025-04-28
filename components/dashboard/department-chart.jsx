"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { useIsMobile } from "@/hooks/use-mobile"

const data = [
  {
    name: "CS",
    total: 25,
  },
  {
    name: "ENG",
    total: 18,
  },
  {
    name: "BUS",
    total: 15,
  },
  {
    name: "MED",
    total: 12,
  },
  {
    name: "ART",
    total: 10,
  },
  {
    name: "SCI",
    total: 8,
  },
  {
    name: "EDU",
    total: 7,
  },
  {
    name: "LAW",
    total: 5,
  },
]

export function DepartmentChart() {
  const isMobile = useIsMobile()

  return (
    <ResponsiveContainer width="100%" height={isMobile ? 250 : 350}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
        <XAxis
          dataKey="name"
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
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}
