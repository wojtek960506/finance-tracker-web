"use client"

import { useState } from "react";
import { Form } from "@/components/ui/form";
import { Label } from "@radix-ui/react-label";
import { useTranslation } from "react-i18next";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { CommonSelect } from "@/components/common/common-select";
import { ControlledSelectField } from "@/components/controlled-form";
import { CommonOmitSelect } from "@/components/common/common-omit-select";
import { StatisticsType, VisualisationType } from "@/types/transaction-types";
import {
  ACCOUNT_OPTIONS,
  CATEGORY_OPTIONS,
  CURRENCY_CODE_OPTIONS,
  PAYMENT_METHOD_OPTIONS
} from "@/lib/consts";
import {
  TransactionStatisticsFilter,
  transactionStatisticsFilterSchema,
} from "@/schemas/transaction-statistics";


const FIRST_YEAR = 2015
const LAST_YEAR = 2025

const yearOptions = Object.fromEntries(
  Array
    .from({ length: LAST_YEAR - FIRST_YEAR + 1 }, (_, i) => i + FIRST_YEAR)
    .map(index => ([index, String(index) ]))
)

const monthOptions = Object.fromEntries(
  Array
    .from({ length: 12 }, (_, i) => i + 1)
    .map(index => ([index, `month${index}` ]))
);


type TransactionStatisticsHeaderProps = {
  tmpFilters: TransactionStatisticsFilter;
  setTmpFilters: (v: TransactionStatisticsFilter) => void;
  defaultValues: TransactionStatisticsFilter;
  statisticsType: StatisticsType;
  setStatisticsType: (v: StatisticsType) => void;
  visualisationType: VisualisationType;
  setVisualisationType: (v: VisualisationType) => void;
}

// TODO split this component into smaller ones
export const TransactionStatisticsHeader = ({
  tmpFilters,
  setTmpFilters,
  defaultValues,
  statisticsType,
  setStatisticsType,
  visualisationType,
  setVisualisationType,
}: TransactionStatisticsHeaderProps) => {
  const { t } = useTranslation("common");
  const [areAdditionalFilters, setAreAdditionalFilters] = useState(false);
  const [omitCategoryOptions, setOmitCategoryOptions] = useState(['myAccount', 'investments'])

  // TODO I copied this code from `filter-header` and adjusted a little
  // think about merging it into one function
  const parseValue = (key: string, value: string | string[]) => {
    if (Array.isArray(value))
        return value.map(v => t(v)).join(",")
    
    switch (key) {
      case "currency":
      case "year":
        return value
      case "month":
        return t(`month${value}`)
      default:
        return t(`${key}_options.${value as string}`);
    }
  }

  const form = useForm<TransactionStatisticsFilter>({
    resolver: zodResolver(transactionStatisticsFilterSchema),
    defaultValues
  });

  const year = useWatch({
    control: form.control,
    name: "year"
  });
  const month = useWatch({
    control: form.control,
    name: "month"
  });
  const category = useWatch({
    control: form.control,
    name: "category"
  });

  const handleSubmit = () => {
    const raw = form.getValues();

    for (const [key, value] of Object.entries(raw)) {
      if (value === "") form.setValue(key as keyof TransactionStatisticsFilter, undefined)
    }
    // zod validation runs when calling form.handleSubmit
    form.handleSubmit(
      (data) => setTmpFilters(data),
      (errors) => console.log("Validation errors - statistics form submit:", errors),
    )();
  }

  const borderCn = "border-2 border-black rounded-lg"

  return (
    <CardHeader>
      <div className="flex flex-col items-center justify-start overflow-x-auto gap-2">
        <div className="flex justify-between w-full items-center max-h-200 space-x-2">
          <CardTitle className="text-2xl w-fit justify-self-start">
            {t('transactionStatistics')}
          </CardTitle>

          <CommonSelect 
            value={statisticsType}
            setValue={(v: string) => {
              setStatisticsType(v as StatisticsType);
              form.setValue("year", undefined);
              form.setValue("month", undefined);
              handleSubmit();
            }}
            placeholderKey="statisticsType"
            options={{
              "sumStatistics": "sumStatistics",
              "averageStatistics": "averageStatistics",
            }}
            className="w-[200px]"
          />

          <CommonSelect 
            value={visualisationType}
            setValue={(v: string) => setVisualisationType(v as VisualisationType)}
            placeholderKey="visualisationType"
            options={{
              "tableVisualisation": "tableVisualisation",
              "barChartVisualisation": "barChartVisualisation",
            }}
            className="w-[200px]"
            isDisabled={visualisationType === "tableVisualisation" && !!year && !!month}
          />

          <div className={`flex gap-2 items-center px-4 ${borderCn}`}>
            <Switch
              id="filter-switch"
              checked={areAdditionalFilters}
              onCheckedChange={() => {
                if (areAdditionalFilters) {
                  form.setValue("category", undefined);
                  form.setValue("paymentMethod", undefined);
                  form.setValue("account", undefined);
                  setAreAdditionalFilters(false);
                  handleSubmit();
                } else {
                  setAreAdditionalFilters(true);
                }
              }}
            />
            <Label htmlFor="filter-switch" className="text-lg whitespace-nowrap">
              {t('additionalFilters')}
            </Label>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={e => {
            e.preventDefault();
            handleSubmit();                  
          }} className="w-full justify-self-start">
            <div className="grid grid-cols-[1fr_1fr_1fr_1fr] items-center gap-x-5 gap-y-2">
              <ControlledSelectField
                name="year"
                placeholderKey="year"
                options={yearOptions}
                isClearable={true}
                isHorizontal={false}
                showLabel={false}
                isDisabled={statisticsType === "averageStatistics" || (
                  visualisationType === "barChartVisualisation" && !!month
                )}

              />
              <ControlledSelectField
                name="month"
                placeholderKey="month"
                options={monthOptions}
                isClearable={true}
                isHorizontal={false}
                showLabel={false}
                isDisabled={statisticsType === "averageStatistics" || (
                  visualisationType === "barChartVisualisation" && !!year
                )}
              />
              <ControlledSelectField
                name="currency"
                placeholderKey="currency"
                options={CURRENCY_CODE_OPTIONS}
                isClearable={false}
                isHorizontal={false}
                showLabel={false}
              />
              <Button type="submit">{t('apply')}</Button>

              {areAdditionalFilters && (
                <>
                  <ControlledSelectField
                    name="category"
                    placeholderKey="category"
                    options={CATEGORY_OPTIONS}
                    isClearable={true}
                    isHorizontal={false}
                    showLabel={false}
                    isDisabled={omitCategoryOptions.length > 0}
                  />
                  <ControlledSelectField
                    name="paymentMethod"
                    placeholderKey="paymentMethod"
                    options={PAYMENT_METHOD_OPTIONS}
                    isClearable={true}
                    isHorizontal={false}
                    showLabel={false}
                  />
                  <ControlledSelectField
                    name="account"
                    placeholderKey="account"
                    options={ACCOUNT_OPTIONS}
                    isClearable={true}
                    isHorizontal={false}
                    showLabel={false}
                  />
                  <CommonOmitSelect
                    options={Object.entries(CATEGORY_OPTIONS).map(([key, value]) => ({
                      label: value,
                      value: key,
                    }))}
                    omitted={omitCategoryOptions}
                    onChange={setOmitCategoryOptions}
                    allInvolvedLabelKey='noCategoriesExcluded'
                    excludedLabelKey='categoriesExcluded'
                    disabled={!!category}
                  />
                </>
              )}
            </div>
          </form>
        </Form>

        <div className="flex gap-2 text-xs justify-start w-full">
          {Object.entries(tmpFilters)
            .filter(
              ([key, value]) => value !== undefined && value !== "" && key !== "omitCategory"
            )
            .sort((a, b) => t(a[0]).toUpperCase() > t(b[0]).toUpperCase() ? 1 : -1)
            .map(([key, value]) => (
              <div key={key} className="px-2 py-1 border border-2 border-black rounded-lg">
                <span className="font-bold">{`${t(key)}: `}</span>
                <span>{parseValue(key, value)}</span>
              </div>
            ))
          }
        </div>
      </div>
    </CardHeader>
  )
}