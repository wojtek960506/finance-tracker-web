"use client"

import { useEffect } from "react";
import { useLogout } from "@/hooks/use-logout";

export function LogoutListener() {
  const handleLogout = useLogout();

  useEffect(() => {    
    window.addEventListener("app:logout", handleLogout);
    return () => {
      window.removeEventListener("app:logout", handleLogout);
    }
  }, [handleLogout]);

  return null;
}