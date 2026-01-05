"use client"

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { NotLoggedLayout } from "@/components/layout/not-logged-layout";
import { StatisticsType, VisualisationType } from "@/types/transaction-types";
import { TransactionStatisticsFilter } from "@/schemas/transaction-statistics";
import {
  TransactionStatisticsContent,
  TransactionStatisticsHeader
} from "@/components/transaction/statistics";
import { useGeneralStore } from "@/store/general-store";


const defaultValues: TransactionStatisticsFilter = {
  year: "",
  month: "",
  currency: "PLN",
  category: undefined,
  excludeCategories: ["myAccount", "investments"],
  paymentMethod: undefined,
  account: undefined,
}

export default function TransactionStatisticsPage() {
  const [filters, setFilters] = useState<TransactionStatisticsFilter>(defaultValues);
  const [statisticsType, setStatisticsType] = useState<StatisticsType>("sumStatistics");
  const [
    visualisationType,
    setVisualisationType
  ] = useState<VisualisationType>("tableVisualisation");
  const isLoggingOut = useGeneralStore(s => s.isLoggingOut);
  
    if (isLoggingOut) return null;

  return (
    <NotLoggedLayout>
      <div className="flex-1 flex flex-col h-full space-y-4 p-1 min-h-[350px]">
        <Card className="overflow-hidden gap-0">
          <TransactionStatisticsHeader
            filters={filters}
            setFilters={setFilters}
            defaultValues={defaultValues}
            statisticsType={statisticsType}
            setStatisticsType={setStatisticsType}
            visualisationType={visualisationType}
            setVisualisationType={setVisualisationType}
          />
          <TransactionStatisticsContent
            filters={filters}
            statisticsType={statisticsType}
            visualisationType={visualisationType}
          />
        </Card>
      </div>
    </NotLoggedLayout>
  )
}