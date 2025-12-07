"use client"

import { ControlledCommonSelectField } from "@/components/controlled-form/controlled-common-select-field";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { ACCOUNTS, CATEGORIES, CURRENCIES, PAYMENT_METHODS } from "@/lib/consts";
import {
  TransactionStatisticsFilter,
  transactionStatisticsFilterSchema,
} from "@/schemas/transaction-statistics";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const FIRST_YEAR = 2015
const LAST_YEAR = 2024

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

const currencyOptions = Object.fromEntries(
  [...CURRENCIES].map(v => [v, v])
);

const categoryOptions = Object.fromEntries(
  [...CATEGORIES].map(v => [v, `category_options.${v}`])
);

const paymentMethodOptions = Object.fromEntries(
  [...PAYMENT_METHODS].map(v => [v, `paymentMethod_options.${v}`])
);

const accountOptions = Object.fromEntries(
  [...ACCOUNTS].map(v => [v, `account_options.${v}`])
);

export const TransactionStatisticsHeader = ({ setTmpFilters, defaultValues }: {
    setTmpFilters: (v: TransactionStatisticsFilter) => void,
    defaultValues: TransactionStatisticsFilter,
}) => {
  const { t } = useTranslation("common");

  const form = useForm<TransactionStatisticsFilter>({
    resolver: zodResolver(transactionStatisticsFilterSchema),
    defaultValues
  })

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

  const [areAdditionalFilters, setAreAdditionalFilters] = useState(false);

  const borderCn = "border-2 border-black rounded-lg"

  return (
    <CardHeader >
      <div className="flex flex-col items-center justify-start gap-2">
        
        <div className="flex justify-between w-full">
          <CardTitle className="text-2xl w-full justify-self-start">
            {t('transactionStatistics')}
          </CardTitle>

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
            <div className="grid grid-cols-[2fr_2fr_2fr_1fr] items-center gap-x-5 gap-y-2">
              <ControlledCommonSelectField
                name="year"
                placeholderKey="year"
                options={yearOptions}
                isClearable={true}
                isHorizontal={false}
                showLabel={false}
              />
              <ControlledCommonSelectField
                name="month"
                placeholderKey="month"
                options={monthOptions}
                isClearable={true}
                isHorizontal={false}
                showLabel={false}
              />
              <ControlledCommonSelectField
                name="currency"
                placeholderKey="currency"
                options={currencyOptions}
                isClearable={false}
                isHorizontal={false}
                showLabel={false}
              />
              <Button type="submit">{t('apply')}</Button>

              {areAdditionalFilters && (
                <>
                  <ControlledCommonSelectField
                    name="category"
                    placeholderKey="category"
                    options={categoryOptions}
                    isClearable={true}
                    isHorizontal={false}
                    showLabel={false}
                  />
                  <ControlledCommonSelectField
                    name="paymentMethod"
                    placeholderKey="paymentMethod"
                    options={paymentMethodOptions}
                    isClearable={true}
                    isHorizontal={false}
                    showLabel={false}
                  />
                  <ControlledCommonSelectField
                    name="account"
                    placeholderKey="account"
                    options={accountOptions}
                    isClearable={true}
                    isHorizontal={false}
                    showLabel={false}
                  />
                </>
              )}
            </div>
          </form>
        </Form>
      </div>
    </CardHeader>
  )
}