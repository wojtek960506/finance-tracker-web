import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { CommonModal } from "@/components/common";
import { Separator } from "@/components/ui/separator";
import { TransactionsFilterHeader } from "./filter-header";
import { useFormatNumber } from "@/hooks/use-format-number";
import { ExpandableItem } from "@/components/common/expandable-item";
import { useGetTransactionTotals } from "@/hooks/use-get-transaction-totals";


type TmpTotalsByCurrencyRowProps = {
  title: string,
  valueExpense: string | number,
  valueIncome: string | number,
  isTextBold?: boolean,
}

const TmpTotalsByCurrencyRow = ({
  title,
  valueExpense,
  valueIncome,
  isTextBold = false,
}: TmpTotalsByCurrencyRowProps) => (
  <>
    <span className={cn("text-center py-1", isTextBold ? "font-bold" : "")}>
      {title}
    </span>
    <Separator orientation="vertical" className="!w-[2px]" />
    <span className={cn("text-center py-1", isTextBold ? "font-bold" : "")}>
      {valueExpense}
    </span>
    <Separator orientation="vertical" className="!w-[2px]" />
    <span className={cn("text-center py-1", isTextBold ? "font-bold" : "")}>
      {valueIncome}
    </span>
  </>
)

export const TransactionTotalsModal = () => {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);
  const { data } = useGetTransactionTotals();
  const formatNumber = useFormatNumber();

  if (!data) return null;
  
  const trigger = (
    <Button variant="default">{data.overall.totalItems} item(s)</Button>
  )

  return (
    <CommonModal
      open={open}
      onOpenChange={setOpen}
      title={t('transactionTotals')}
      description={t('transactionTotalsDescription')}
      trigger={trigger}
    >    
      <div className="flex flex-col overflow-hidden gap-2">

        <TransactionsFilterHeader />

        <Card className="p-2 mx-1">
          <div className="grid grid-cols-[1fr_1fr_1fr] gap-2">
            <div className="flex flex-col items-center font-bold">
              <span>{t('totalItems')}</span>
              <span>{data.overall.totalItems}</span>
            </div>
            <div className="flex flex-col items-center font-bold">
              <span>{t('expenseItems')}</span>
              <span>{data.overall.expense.totalItems}</span>
            </div>
            <div className="flex flex-col items-center font-bold">
              <span>{t('incomeItems')}</span>
              <span>{data.overall.income.totalItems}</span>
            </div>
          </div>
        </Card>
        
        {Object.entries(data.byCurrency).map(([currency, values]) => (
          <Card key={currency} className="py-2 px-4 mx-1">
            <ExpandableItem
              trigger={(
                <span className="text-xl font-bold">
                  {`${currency} (${t(`currency_options.${currency}`)})`}
                </span>
              )}
              contentClassName="flex flex-col text-sm"
            >
              <div className="grid grid-cols-[1fr_1fr] text-base">
                <span className="text-right pr-2 py-1 font-bold">
                  {t('totalItems')}
                  </span>
                <span className="text-left pl-2 py-1 font-bold">
                  {values.totalItems}
                </span>
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] mt-2">
                <Separator orientation="vertical" className="!w-[2px] col-span-1 col-start-2 " />
                <span className="text-center py-1">{t('expense')}</span>
                <Separator orientation="vertical" className="!w-[2px]" />
                <span className="col-span-1 text-center py-1">{t('income')}</span>

                <Separator orientation="horizontal" className="col-span-5" />

                <TmpTotalsByCurrencyRow
                  title={t('totalItems')}
                  valueExpense={values.expense.totalItems}
                  valueIncome={values.income.totalItems}
                  isTextBold={true}
                />

                <Separator orientation="horizontal" className="col-span-5" />

                <TmpTotalsByCurrencyRow
                  title={t('totalAmount')}
                  valueExpense={formatNumber(values.expense.totalAmount, 2, true)}
                  valueIncome={formatNumber(values.income.totalAmount, 2, true)}
                />

                <Separator orientation="horizontal" className="col-span-5" />

                <TmpTotalsByCurrencyRow
                  title={t('averageAmount')}
                  valueExpense={formatNumber(values.expense.averageAmount, 2, true)}
                  valueIncome={formatNumber(values.income.averageAmount, 2, true)}
                />

                <Separator orientation="horizontal" className="col-span-5" />

                <TmpTotalsByCurrencyRow
                  title={t('maxAmount')}
                  valueExpense={formatNumber(values.expense.maxAmount, 2, true)}
                  valueIncome={formatNumber(values.income.maxAmount, 2, true)}
                />

                <Separator orientation="horizontal" className="col-span-5" />

                <TmpTotalsByCurrencyRow
                  title={t('minAmount')}
                  valueExpense={formatNumber(values.expense.minAmount, 2, true)}
                  valueIncome={formatNumber(values.income.minAmount, 2, true)}
                />
              </div>
            </ExpandableItem>
          </Card>
        ))}
      </div>
    </CommonModal>
  )
}