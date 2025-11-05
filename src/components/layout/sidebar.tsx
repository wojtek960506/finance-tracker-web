"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Table,
  Settings,
} from "lucide-react"

// Centralized nav items config
const navItems = [
  { href: "/transactions", label: "Transactions", icon: Table },
  { href: "/reports", label: "Reports", icon: LayoutDashboard },
  { href: "/settings", label: "Settings", icon: Settings },
]

// Base link class (clean + reusable)
const baseLinkClass =
  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"

// Component
export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex flex-col w-64 h-screen border-r bg-background p-4">
      {/* App logo / name */}
      <div className="text-xl font-semibold mb-8 px-2">Finance Tracker</div>

      {/* Navigation links */}
      <nav className="space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href)

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                baseLinkClass,
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
