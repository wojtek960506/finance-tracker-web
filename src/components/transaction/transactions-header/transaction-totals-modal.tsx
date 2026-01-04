import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { CommonModal } from "@/components/common";
import { Separator } from "@/components/ui/separator";
import { TransactionsFilterHeader } from "./filter-header";
import { ExpandableItem } from "@/components/common/expandable-item";
import { useGetTransactionTotals } from "@/hooks/use-get-transaction-totals";


export const TransactionTotalsModal = () => {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);
  const { data } = useGetTransactionTotals();

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
      <div className="flex flex-col overflow-hidden">

        <TransactionsFilterHeader />

        <Card className="p-2 my-5 mx-1">
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
          <Card key={currency} className="py-2 px-4 m-1">
            <ExpandableItem
              trigger={(
                <span className="text-xl font-bold">
                  {`${currency} (${t(`currency_options.${currency}`)})`}
                </span>
              )}
              contentClassName="flex flex-col"
            >
              {/* TODO enhance how this data is presented */}
              <span className=" w-full font-bold text-m text-center">
                {`${t('totalItems')}: ${values.totalItems}`}
              </span>
              <Separator className="col-span-2 bg-gray-300"/>

              <span>Expense - total items: {values.expense.totalItems}</span>
              <span>Expense - total amount: {values.expense.totalAmount}</span>
              <span>Expense - average amount: {values.expense.averageAmount}</span>
              <span>Expense - max amount: {values.expense.maxAmount}</span>
              <span>Expense - min amount: {values.expense.minAmount}</span>

              <Separator className="col-span-2 bg-gray-300"/>

              <span>Income - total items: {values.income.totalItems}</span>
              <span>Income - total amount: {values.income.totalAmount}</span>
              <span>Income - average amount: {values.income.averageAmount}</span>
              <span>Income - max amount: {values.income.maxAmount}</span>
              <span>Income - min amount: {values.income.minAmount}</span>

            </ExpandableItem>
          </Card>
        ))}

        {/* {Object.entries(data.byCurrency).map(([currency, values]) => (
          <div key={currency} className="flex flex-col">
            <span className="font-bold text-xl">{currency}</span>

            <span className="font-bold text-m">Total Items: {values.totalItems}</span>
            <Separator className="col-span-2 bg-gray-300"/>

            <span>Expense - total items: {values.expense.totalItems}</span>
            <span>Expense - total amount: {values.expense.totalAmount}</span>
            <span>Expense - average amount: {values.expense.averageAmount}</span>
            <span>Expense - max amount: {values.expense.maxAmount}</span>
            <span>Expense - min amount: {values.expense.minAmount}</span>

            <Separator className="col-span-2 bg-gray-300"/>

            <span>Income - total items: {values.income.totalItems}</span>
            <span>Income - total amount: {values.income.totalAmount}</span>
            <span>Income - average amount: {values.income.averageAmount}</span>
            <span>Income - max amount: {values.income.maxAmount}</span>
            <span>Income - min amount: {values.income.minAmount}</span>
            
            <Separator className="col-span-2 bg-gray-300 !h-1"/>
          </div>
        ))} */}
      </div>
      
    </CommonModal>
  )
}