import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { CommonModal } from "@/components/common";
import { Separator } from "@/components/ui/separator";
import { TransactionsFilterHeader } from "./filter-header";
import { useGetTransactionTotals } from "@/hooks/use-get-transaction-totals";


export const TransactionTotalsModal = () => {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);
  const { data } = useGetTransactionTotals();

  if (!data) return null;
  
  const trigger = (
    <Button variant="default">{data.overall.totalItems} item(s)</Button>
  )

  // TODO enhance how this data is presented
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

        <span>Total Items: {data.overall.totalItems}</span>
        <span>Expense - total items: {data.overall.expense.totalItems}</span>
        <span>Income - total items: {data.overall.income.totalItems}</span>
        
        <Separator className="col-span-2 bg-gray-300 !h-1" />

        {Object.entries(data.byCurrency).map(([currency, values]) => (
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
        ))}
      </div>
      
    </CommonModal>
  )
}