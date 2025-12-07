"use client"

import { ControlledCommonSelectField } from "@/components/controlled-form/controlled-common-select-field";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { CURRENCIES } from "@/lib/consts";
import {
  TransactionStatisticsFilter,
  transactionStatisticsFilterSchema,
} from "@/schemas/transaction-statistics";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

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

    if (!raw.year && !raw.month) {
      toast.warning(t("monthOrYearNotProvided"));
      return;
    }

    for (const [key, value] of Object.entries(raw)) {
      if (value === "") form.setValue(key as keyof TransactionStatisticsFilter, undefined)
    }
    // zod validation runs when calling form.handleSubmit
    form.handleSubmit(
      (data) => setTmpFilters(data),
      (errors) => console.log("Validation errors - statistics form submit:", errors),
    )();
  }

  return (
    <CardHeader >
      <div className="flex flex-col items-center justify-start gap-1">
        <CardTitle className="text-2xl w-full justify-self-start">
          {t('transactionStatistics')}
        </CardTitle>
        <Form {...form}>
          <form onSubmit={e => {
            e.preventDefault();
            handleSubmit();                  
          }} className="w-full justify-self-start">
            <div className="grid grid-cols-[2fr_2fr_2fr_1fr] items-center gap-5">
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
            </div>
          </form>
        </Form>
      </div>
    </CardHeader>
  )
}