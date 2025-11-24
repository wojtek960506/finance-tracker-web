"use client"

import { Sidebar } from "./sidebar"
import { Topbar } from "./topbar"

import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";
import { useGeneralStore } from "@/store/general-store";
import { Spinner } from "@/components/ui/spinner";
import { usePathname } from "next/navigation";

export function AppLayout({ children }: { children: React.ReactNode }) {

  const hasHydrated = useGeneralStore(s => s._hasHydrated);
  const accessToken = useGeneralStore(s => s.accessToken);
  const pathname = usePathname();

  if (!hasHydrated) {
    return (
      <div className="flex h-screen justify-center items-center gap-2 text-4xl">
        <span>Loading</span>
        <Spinner className="w-[1em] h-[1em] inline-block"/>
      </div>
    )
  }

  const showSidebard = accessToken && !["/login", "/register"].includes(pathname);

  return (
    <I18nextProvider i18n={i18n}>
      <div className="flex flex-col h-screen">
        <Topbar />
        <div className="flex flex-row flex-1 overflow-hidden">
          {showSidebard && <Sidebar />}
          <main className="flex-1 flex flex-col overflow-y-auto bg-blue-50">
            {children}
          </main>
        </div>
      </div>
    </I18nextProvider>
  )
}

// bg-muted/10
