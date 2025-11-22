"use client"

import { useEffect } from "react";
import { useGeneralStore } from "@/store/general-store";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function LogoutListener() {
  // const handleLogout = useLogout();
  const { setAccessToken } = useGeneralStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {    

    const handleLogout = () => {
      router.push('/login');
      setAccessToken(null);
      queryClient.removeQueries({ queryKey: ['user']});
      queryClient.removeQueries({ queryKey: ['transactions']});
    }

    window.addEventListener("app:logout", handleLogout);

    return () => {
      window.removeEventListener("app:logout", handleLogout);
    }
  }, [queryClient, router, setAccessToken]);

  return null;
}