"use client"

import { useTranslation } from "react-i18next";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/use-logout";

export const PrivateContextMenuItems = () => {
  const { t } = useTranslation("common");
  const handleLogout = useLogout();

  return (
    <>
      <DropdownMenuItem
        className="justify-end"
        onClick={(e) => {
          e.stopPropagation();
          handleLogout();
        }}
      >
        {t('logout')}
      </DropdownMenuItem>
    </>
    
  )
}