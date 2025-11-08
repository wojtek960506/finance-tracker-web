"use client"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useTranslation } from "react-i18next";

export function Topbar() {
  const { t, i18n } = useTranslation("common");

  const switchLanguage = (lng: "en" | "pl") => i18n.changeLanguage(lng);

  return (
    <header className="flex items-center justify-between h-14 border-b bg-background px-6">
      {/* Left side — app section title or menu */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold tracking-tight">{t('transactions')}</h1>
      </div>

      {/* Right side — placeholder for future features */}
      <div className="flex items-center gap-4">
        <Button variant="secondary" onClick={() => switchLanguage("en")}>English</Button>
        <Button variant="secondary" onClick={() => switchLanguage("pl")}>Polski</Button>        
        <div className="text-sm text-muted-foreground">Hello, User</div>
      </div>
    </header>
  )
}
