"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { TransactionsMain } from "@/components/transaction/main";
import { Spinner } from "@/components/ui/spinner";
import { useGeneralStore } from "@/store/general-store";
import { useTransactionsFilterStore } from "@/store/transactions-filter-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function TransactionsPage() {
  const accessToken = useGeneralStore(s => s.accessToken);
  const hasHydrated = useGeneralStore(s => s._hasHydrated);
  const hasTransactionsFilterHydrated = useTransactionsFilterStore(s => s._hasHydrated);
  const router = useRouter();

  useEffect(() => {
    // store values has to be hydrated from localStorage because at the refresh
    // of the page they are rendered like for the first time with default values
    if (!hasHydrated || !hasTransactionsFilterHydrated) return;
    
    if (!accessToken) router.replace("/login");
  }, [accessToken, router, hasHydrated, hasTransactionsFilterHydrated]);

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