"use client"

import { Sidebar } from "./sidebar"
import { Topbar } from "./topbar"

import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <div className="flex h-screen">
      {/* Sidebar (fixed on the left) */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 bg-muted/10">
          {children}
        </main>
      </div>
    </div>
    </I18nextProvider>
  )
}
