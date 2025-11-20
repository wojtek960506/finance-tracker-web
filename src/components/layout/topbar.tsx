"use client"

import { Button } from "@/components/ui/button"
import { useGeneralStore } from "@/store/general-store";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { UserContextMenu } from "@/components/user/user-context-menu";
import { logout } from "@/api/auth-api";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function Topbar() {
  const { t, i18n } = useTranslation("common");
  const { accessToken, setAccessToken, language, setLanguage } = useGeneralStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language])

  const switchLanguage = (lang: "en" | "pl") => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  }

  return (
    <header className="flex items-center h-14 border-b bg-background ">
      <div
        className="flex h-full w-64 flex-shrink-0 text-xl font-semibold px-4 items-center border-r"
      >
        {t('title')}
      </div>
      
      <div
        className="flex items-center justify-between h-14 px-6 w-full  gap-3"
      >

        {/* Left side — app section title or menu */}
        <div className="flex items-center gap-3">
          { accessToken && <h1 className="text-lg font-semibold tracking-tight">
            {t('transactions')}
          </h1> }
        </div>

        {/* Right side — placeholder for future features */}
        <div className="flex items-center gap-4">
          <Button
            variant={language === "en" ? "default" : "secondary"}
            onClick={() => {
              switchLanguage("en")
              setLanguage("en")
            }}
          >
            {t('languageEnglish')}
          </Button>
          <Button
            variant={language === "pl" ? "default" : "secondary"}
            onClick={() => {
              switchLanguage("pl")
              setLanguage("pl")
            }}
          >
            {t('languagePolish')}
          </Button>
          <UserContextMenu
            onLogout={async () => {
              console.log('logout');
              const { success } = await logout(accessToken);

              if (success) {
                console.log('logged out');
                setAccessToken(null);
                queryClient.removeQueries({ queryKey: ['user']});
                queryClient.removeQueries({ queryKey: ['transactions']});
                router.push('/login');
              } else {
                console.log('not logged out');
              }
              
            }}
          />
        </div>
      </div>
    </header>
  )
}
