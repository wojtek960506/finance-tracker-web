"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { TransactionsMain } from "@/components/transaction/main";
import { Spinner } from "@/components/ui/spinner";
import { useGeneralStore } from "@/store/general-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function TransactionsPage() {
  const accessToken = useGeneralStore(s => s.accessToken)
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.replace("/login");
    }
  }, [accessToken, router]);

  if (!accessToken) {
    return (
      <div className="flex h-screen justify-center items-center gap-2 text-4xl">
        <span>Loading</span>
        <Spinner className="w-[1em] h-[1em] inline-block"/>
      </div>
    )
  }

  return (
    <AppLayout>
      <TransactionsMain />
    </AppLayout>
  )
}