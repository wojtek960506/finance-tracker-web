"use client"

import { Sidebar } from "./sidebar"
import { Topbar } from "./topbar"

import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";
import { useEffect, useState } from "react";

export function AppLayout({ children }: { children: React.ReactNode }) {

  const [accessToken, setAccessToken] = useState<string | null>(null);
  
  console.log('accessToken', accessToken);
  
  useEffect(() => {
    const token = localStorage.getItem("access-token");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAccessToken(token);
  }, [setAccessToken]);

  return (
    <I18nextProvider i18n={i18n}>
      <div className="flex flex-col h-screen">
        {/* Sidebar (fixed on the left) */}
        <Topbar />

        {/* Main content area */}
        <div className="flex flex-row flex-1 overflow-hidden">
          
          {accessToken && <Sidebar />}
          <main className="flex-1 flex flex-col overflow-hidden bg-muted/10">
            {children}
          </main>
        </div>
      </div>
    </I18nextProvider>
  )
}
