"use client"

import { useGeneralStore } from "@/store/general-store";
import { logout } from "@/api/auth-api";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CommonError } from "@/types/api-types";

export const useLogout = () => {
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

  return handleLogout;
}