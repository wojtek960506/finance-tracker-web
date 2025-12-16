"use client"

import { logoutCore } from "@/api/auth-api";
import { useGeneralStore } from "@/store/general-store";
import { resetTransactionsFilterStore } from "@/store/transactions-filter-store";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


export const useLogout = (isInsideRefresh: boolean = false) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setIsLoggingOut = useGeneralStore(s => s.setIsLoggingOut);

  const handleLogout = async () => {
    router.replace('/login');
    setIsLoggingOut(true);
    queryClient.clear();
    resetTransactionsFilterStore();
    await logoutCore(isInsideRefresh);
  }

  return handleLogout;
}