"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, GraduationCap, Home, Settings, Users } from "lucide-react"

import { cn } from "@/lib/utils"

const routes = [
  {
    label: "Home",
    icon: Home,
    href: "/",
    color: "text-sky-500",
  },
  {
    label: "Dashboard",
    icon: BarChart3,
    href: "/dashboard",
    color: "text-violet-500",
  },
  {
    label: "Students",
    icon: Users,
    href: "/students",
    color: "text-pink-700",
  }
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-[240px] flex-col border-r bg-slate-100/40 px-3 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 text-lg font-semibold tracking-tight">Student Management</h2>
      </div>
      <div className="space-y-1">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-slate-200/50",
              pathname === route.href ? "bg-slate-200 text-slate-900" : "text-slate-500 hover:text-slate-900",
            )}
          >
            <route.icon className={cn("mr-2 h-4 w-4", route.color)} />
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
