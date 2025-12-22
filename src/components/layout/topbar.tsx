"use client"

import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { PageMenu } from "../page-menu/page-menu";
import { useGeneralStore } from "@/store/general-store";
import { UserContextMenu } from "@/components/user/user-context-menu";


export function Topbar() {
  const { t } = useTranslation("common");
  const { accessToken, isLoggingOut } = useGeneralStore();
  const pathname = usePathname();
  const showPageMenu =
    accessToken &&
    !["/login", "/register"].includes(pathname) &&
    !isLoggingOut;

  return (
    <header className="flex items-center h-14 border-b bg-background">
      <div
        className="flex h-full w-64 flex-shrink-0 text-xl font-semibold px-4 items-center border-r"
      >
        {t('title')}
      </div>
      <div className="flex items-center justify-between h-14 px-6 w-full gap-3">
        {/* Left side — app section title or menu */}
        <div className="flex items-center gap-3">
          {showPageMenu && <PageMenu />}
        </div>
        {/* Right side — placeholder for future features */}
        <div className="flex items-center gap-4">
          <UserContextMenu />
        </div>
      </div>
    </header>
  )
}
