"use client"

import { useState } from "react";
import "@/components/components.css";
import { TitleRow } from "./title-row";
import { Form } from "@/components/ui/form";
import { MainFilters } from "./main-filters";
import { CardHeader } from "@/components/ui/card";
import { FiltersSummary } from "./filters-summary";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StatisticsType, VisualisationType } from "@/types/transaction-types";
import {
  TransactionStatisticsFilter,
  transactionStatisticsFilterSchema,
} from "@/schemas/transaction-statistics";
import { AdditionalFilters } from "./additional-filters";


type TransactionStatisticsHeaderProps = {
  filters: TransactionStatisticsFilter;
  setFilters: (v: TransactionStatisticsFilter) => void;
  defaultValues: TransactionStatisticsFilter;
  statisticsType: StatisticsType;
  setStatisticsType: (v: StatisticsType) => void;
  visualisationType: VisualisationType;
  setVisualisationType: (v: VisualisationType) => void;
}

export const TransactionStatisticsHeader = ({
  filters,
  setFilters,
  defaultValues,
  statisticsType,
  setStatisticsType,
  visualisationType,
  setVisualisationType,
}: TransactionStatisticsHeaderProps) => {
  const [areAdditionalFilters, setAreAdditionalFilters] = useState(false);

  const form = useForm<TransactionStatisticsFilter>({
    resolver: zodResolver(transactionStatisticsFilterSchema),
    defaultValues
  });

  const year = useWatch({ control: form.control, name: "year" });
  const month = useWatch({ control: form.control, name: "month" });
  const category = useWatch({ control: form.control, name: "category" });
  const excludeCategories = useWatch({ control: form.control, name: "excludeCategories" });

  const handleSubmit = () => {
    const raw = form.getValues();

    for (const [key, value] of Object.entries(raw)) {
      if (value === "") form.setValue(key as keyof TransactionStatisticsFilter, undefined)
    }
    // zod validation runs when calling form.handleSubmit
    form.handleSubmit(
      (data) => setFilters(data),
      (errors) => console.log("Validation errors - statistics form submit:", errors),
    )();
  }

  const handleAdditionalFiltersSwitchChange = () => {
    if (areAdditionalFilters) {
      form.setValue("category", undefined);
      form.setValue("paymentMethod", undefined);
      form.setValue("account", undefined);
      setAreAdditionalFilters(false);
      handleSubmit();
    } else {
      setAreAdditionalFilters(true);
    }
  }

  const handleStatisticsTypeChange = (v: string) => {
    setStatisticsType(v as StatisticsType);
    form.setValue("year", undefined);
    form.setValue("month", undefined);
    handleSubmit();
  }

  return (
    <CardHeader>
      <div className="flex flex-col items-center justify-start overflow-x-auto gap-2">
        <TitleRow
          year={year}
          month={month}
          statisticsType={statisticsType}
          visualisationType={visualisationType}
          setVisualisationType={setVisualisationType}
          areAdditionalFilters={areAdditionalFilters}
          onStatisticsTypeChange={handleStatisticsTypeChange}
          onAdditionalFiltersSwitchChange={handleAdditionalFiltersSwitchChange}
        />
        <Form {...form}>
          <form onSubmit={e => {
            e.preventDefault();
            handleSubmit();                  
          }} className="w-full justify-self-start">
            <div className="grid grid-cols-[1fr_1fr_1fr_1fr] items-center gap-x-5 gap-y-2">
              <MainFilters
                year={year}
                month={month}
                statisticsType={statisticsType}
                visualisationType={visualisationType}
              />
              {areAdditionalFilters && (
                <AdditionalFilters
                  category={category}
                  excludeCategories={excludeCategories}
                />
              )}
            </div>
          </form>
        </Form>
        <FiltersSummary filters={filters} />
      </div>
    </CardHeader>
  )
}