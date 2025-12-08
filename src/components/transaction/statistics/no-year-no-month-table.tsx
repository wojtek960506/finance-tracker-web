import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetTransactionStatistics } from "@/hooks/use-get-transaction-statistics";
import { cn } from "@/lib/utils";
import { TransactionStatisticsFilter } from "@/schemas/transaction-statistics";
import { NoYearStatistics } from "@/types/transaction-types";
import { useTranslation } from "react-i18next";

export const NoYearNoMonthTable = (
  { filters }: { filters: TransactionStatisticsFilter }
) => {
  const { t } = useTranslation("common");

  const { data: dataExpense } = useGetTransactionStatistics(filters, "expense");
  const { data: dataIncome } = useGetTransactionStatistics(filters, "income");

  if (!dataExpense || !dataIncome) return null;

  const expense = dataExpense as NoYearStatistics;
  const income = dataIncome as NoYearStatistics;

  const yearlyExpense = expense.yearly;
  const yearlyIncome = income.yearly;

  const yearlyKeys = new Set([...Object.keys(yearlyExpense), ...Object.keys(yearlyIncome)]);

  const headStyle = (colorNum: number, isBottomThicker: boolean = false) => {
    return cn(
      `text-center border border-gray-600 ${isBottomThicker ? "border-b-3" : ""}`,
      `bg-gray-${colorNum}`
    )
  } 

  const allTimeStyle = () => {
    const totalBalance = income.allTime.totalAmount - expense.allTime.totalAmount;
    const bgColor = totalBalance > 0
      ? "bg-green-200"
      : totalBalance === 0 ? "bg-blue-200" : "bg-red-200"

    return `text-center border border-gray-600 ${bgColor} border-t-3`;
  } 

  return (
    <Table className="text-base">
      <TableHeader className="sticky top-0 bg-background z-10">
        <TableRow>
          <TableHead className={cn(headStyle(100))}></TableHead>
          <TableHead colSpan={2} className={headStyle(100)}>{t('totalAmount')}</TableHead>
          <TableHead colSpan={2} className={headStyle(100)}>{t('totalItems')}</TableHead>
          <TableHead className={cn(headStyle(100), "border-l-3")}></TableHead>
        </TableRow>
        <TableRow>
          <TableHead className={headStyle(200, true)}>{t('year')}</TableHead>
          <TableHead className={headStyle(200, true)}>{t('expense')}</TableHead>
          <TableHead className={headStyle(200, true)}>{t('income')}</TableHead>
          <TableHead className={headStyle(200, true)}>{t('expense')}</TableHead>
          <TableHead className={headStyle(200, true)}>{t('income')}</TableHead>
          <TableHead className={cn(headStyle(200, true), "border-l-3")}>{t('balance')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...yearlyKeys].map(year => {
          
          const totalAmountExpense = yearlyExpense[Number(year)]?.totalAmount ?? 0;
          const totalAmountIncome = yearlyIncome[Number(year)]?.totalAmount ?? 0;
          const totalItemsExpense = yearlyExpense[Number(year)]?.totalItems ?? 0;
          const totalItemsIncome = yearlyIncome[Number(year)]?.totalItems ?? 0;
          const totalBalance = totalAmountIncome - totalAmountExpense;

          const cellStyle = () => {
            const bgColor = totalBalance > 0
              ? "bg-green-100"
              : totalBalance === 0 ? "bg-blue-100" : "bg-red-100"

            return `text-center border-x border-gray-600 ${bgColor}`;
          }

          return (
            <TableRow key={year}>
              <TableCell className={cellStyle()}>{year}</TableCell>
              <TableCell className={cellStyle()}>{totalAmountExpense.toFixed(2)}</TableCell>
              <TableCell className={cellStyle()}>{totalAmountIncome.toFixed(2)}</TableCell>
              <TableCell className={cellStyle()}>{totalItemsExpense}</TableCell>
              <TableCell className={cellStyle()}>{totalItemsIncome}</TableCell>
              <TableCell className={cn(cellStyle(), "border-l-3")}>
                {totalBalance.toFixed(2)}
              </TableCell>
            </TableRow>
          )
        })}
        <TableRow key={'allTime'}>
          <TableCell className={allTimeStyle()}>{t('allTime')}</TableCell>
          <TableCell className={allTimeStyle()}>{expense.allTime.totalAmount.toFixed(2)}</TableCell>
          <TableCell className={allTimeStyle()}>{income.allTime.totalAmount.toFixed(2)}</TableCell>
          <TableCell className={allTimeStyle()}>{expense.allTime.totalItems}</TableCell>
          <TableCell className={allTimeStyle()}>{income.allTime.totalItems}</TableCell>
          <TableCell className={cn(allTimeStyle(), "border-l-3")}>
            {(income.allTime.totalAmount - expense.allTime.totalAmount).toFixed(2)}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )

}