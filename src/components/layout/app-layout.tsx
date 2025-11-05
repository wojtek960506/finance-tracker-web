"use client"

import { Sidebar } from "./sidebar"
import { Topbar } from "./topbar"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar (fixed on the left) */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 bg-muted/10">
          {children}
        </main>
      </div>
    </div>
  )
}
