"use client"

import { logoutCore } from "@/api/auth-api";
import { useGeneralStore } from "@/store/general-store";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setIsLoggingOut = useGeneralStore(s => s.setIsLoggingOut);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    router.replace('/login');
    queryClient.removeQueries({ queryKey: ['user'] });
    queryClient.removeQueries({ queryKey: ['transactions'] });
    await logoutCore();
  }

  return handleLogout;
}