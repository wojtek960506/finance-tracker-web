"use client"

import { AppLayout } from "@/components/layout/app-layout";
import {
  TransactionStatisticsContent,
  TransactionStatisticsHeader
} from "@/components/transaction/statistics";
import { Card } from "@/components/ui/card";
import { TransactionStatisticsFilter } from "@/schemas/transaction-statistics";
import { useState } from "react";

const defaultValues: TransactionStatisticsFilter = {
  year: "",
  month: "",
  currency: "PLN",
  category: undefined,
  omitCategory: undefined,
  paymentMethod: undefined,
  account: undefined,
}

export default function TransactionStatisticsPage() {
  const [tmpFilters, setTmpFilters] = useState<TransactionStatisticsFilter>(defaultValues);

  return (
    <AppLayout>
      <div className="flex-1 flex flex-col h-full space-y-4 p-1 min-h-[300px]">
        <Card className="overflow-hidden">
          <TransactionStatisticsHeader
            setTmpFilters={setTmpFilters}
            defaultValues={defaultValues}
          />
          <TransactionStatisticsContent tmpFilters={tmpFilters} />
        </Card>
      </div>
    </AppLayout>
  )
}