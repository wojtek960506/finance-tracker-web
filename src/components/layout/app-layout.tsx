"use client"

import { Sidebar } from "./sidebar"
import { Topbar } from "./topbar"

import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";
import { useEffect } from "react";
import { useGeneralStore } from "@/store/general-store";

export function AppLayout({ children }: { children: React.ReactNode }) {

  const { accessToken, setAccessToken, setLanguage } = useGeneralStore();
  
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const language = localStorage.getItem("language") || "en";
    setAccessToken(accessToken);
    setLanguage(language);
  }, [setAccessToken, setLanguage]);

  return (
    <I18nextProvider i18n={i18n}>
      <div className="flex flex-col h-screen">
        <Topbar />
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
