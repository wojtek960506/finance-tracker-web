"use client"

import { useGeneralStore } from "@/store/general-store";
import { useTranslation } from "react-i18next";
import { UserContextMenu } from "@/components/user/user-context-menu";
import { logout } from "@/api/auth-api";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { CommonError } from "@/types/api-types";

export function Topbar() {
  const { t } = useTranslation("common");
  const { accessToken, setAccessToken } = useGeneralStore();
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      setAccessToken(null);
      queryClient.removeQueries({ queryKey: ['user']});
      queryClient.removeQueries({ queryKey: ['transactions']});
      await logout(accessToken);
    } catch (err) {
      toast.error((err as CommonError).message);
    } finally {
      setAccessToken(null);
      router.push('/login');
    }
  }
  const showPageName = accessToken && pathname !== '/login'

  return (
    <header className="flex items-center h-14 border-b bg-background ">
      <div
        className="flex h-full w-64 flex-shrink-0 text-xl font-semibold px-4 items-center border-r"
      >
        {t('title')}
      </div>
      <div className="flex items-center justify-between h-14 px-6 w-full gap-3">
        {/* Left side — app section title or menu */}
        <div className="flex items-center gap-3">
          { showPageName && <h1 className="text-lg font-semibold tracking-tight">
            {t('transactions')}
          </h1> }
        </div>
        {/* Right side — placeholder for future features */}
        <div className="flex items-center gap-4">
          <UserContextMenu onLogout={handleLogout}/>
        </div>
      </div>
    </header>
  )
}
