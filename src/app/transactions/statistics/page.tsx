"use client"

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { AppLayout } from "@/components/layout/app-layout";
import { StatisticsType, VisualisationType } from "@/types/transaction-types";
import { TransactionStatisticsFilter } from "@/schemas/transaction-statistics";
import {
  TransactionStatisticsContent,
  TransactionStatisticsHeader
} from "@/components/transaction/statistics";


const defaultValues: TransactionStatisticsFilter = {
  year: "",
  month: "",
  currency: "PLN",
  category: undefined,
  omitCategory: ["myAccount", "investments"],
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

  return (
    <AppLayout>
      <div className="flex-1 flex flex-col h-full space-y-4 p-1 min-h-[350px]">
        <Card className="overflow-hidden gap-2">
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
    </AppLayout>
  )
}