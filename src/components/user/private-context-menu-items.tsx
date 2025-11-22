"use client"

import { useGeneralStore } from "@/store/general-store";
import { useTranslation } from "react-i18next";
import { logout } from "@/api/auth-api";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CommonError } from "@/types/api-types";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export const PrivateContextMenuItems = () => {
  const { t } = useTranslation("common");
  const { setAccessToken } = useGeneralStore();
  const queryClient = useQueryClient();
  const router = useRouter();
  
  const handleLogout = async () => {
    try {
      router.push('/login');
      queryClient.removeQueries({ queryKey: ['user']});
      queryClient.removeQueries({ queryKey: ['transactions']});
      await logout();
    } catch (err) {
      toast.error((err as CommonError).message);
    } finally {
      setAccessToken(null);
    }
  }

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