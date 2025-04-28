"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, GraduationCap, Home, Menu, Settings, Users, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
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
  },
  {
    label: "Departments",
    icon: GraduationCap,
    href: "/departments",
    color: "text-orange-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-gray-500",
  },
]

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="flex h-16 items-center justify-between border-b px-4">
        <div className="font-semibold">Student Management</div>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
      </div>
      <SheetContent side="left" className="w-[240px] sm:w-[300px]">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b py-4">
            <div className="px-2 font-semibold">Student Management</div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="flex-1 space-y-1 py-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-slate-200/50",
                  pathname === route.href ? "bg-slate-200 text-slate-900" : "text-slate-500 hover:text-slate-900",
                )}
              >
                <route.icon className={cn("mr-2 h-4 w-4", route.color)} />
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
