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


  const headStyleDarker = cn("text-center", "bg-gray-200");
   
  const allTimeStyle = (() => {
    const totalBalance = income.allTime.totalAmount - expense.allTime.totalAmount;
    const bgColor = totalBalance > 0
      ? "bg-green-200"
      : totalBalance === 0 ? "bg-blue-200" : "bg-red-200"
    return cn("text-center", `${bgColor}`, "border border-0");
  })();

  return (
    <Table className="text-base">
      <TableHeader className="sticky top-0 z-20">
        <TableRow className="h-11">
          <TableHead className={headStyleDarker}>{t('year')}</TableHead>
          <TableHead className={headStyleDarker}>{t('expenseAmount')}</TableHead>
          <TableHead className={headStyleDarker}>{t('incomeAmount')}</TableHead>
          <TableHead className={headStyleDarker}>{t('balanceAmount')}</TableHead>
          <TableHead className={headStyleDarker}>{t('expenseItems')}</TableHead>
          <TableHead className={headStyleDarker}>{t('incomeItems')}</TableHead>
          
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...yearlyKeys].map(year => {
          
          const totalAmountExpense = yearlyExpense[Number(year)]?.totalAmount ?? 0;
          const totalAmountIncome = yearlyIncome[Number(year)]?.totalAmount ?? 0;
          const totalItemsExpense = yearlyExpense[Number(year)]?.totalItems ?? 0;
          const totalItemsIncome = yearlyIncome[Number(year)]?.totalItems ?? 0;
          const totalBalance = totalAmountIncome - totalAmountExpense;

          const cellStyle = (() => {
            const bgColor = totalBalance > 0
              ? "bg-green-100"
              : totalBalance === 0 ? "bg-blue-100" : "bg-red-100"

            return cn(
              "text-center",
              `${bgColor}`,
              "border border-0"
            );
          })()

          return (
            <TableRow key={year} className="h-10">
              <TableCell className={cellStyle}>{year}</TableCell>
              <TableCell className={cellStyle}>{totalAmountExpense.toFixed(2)}</TableCell>
              <TableCell className={cellStyle}>{totalAmountIncome.toFixed(2)}</TableCell>
              <TableCell className={cellStyle}>{totalBalance.toFixed(2)}</TableCell>
              <TableCell className={cellStyle}>{totalItemsExpense}</TableCell>
              <TableCell className={cellStyle}>{totalItemsIncome}</TableCell>
            </TableRow>
          )
        })}
        
        <TableRow key={'allTime'} className="sticky bottom-0 z-20 bg-gray-200 h-11">
          <TableCell className={allTimeStyle}>{t('allTime')}</TableCell>
          <TableCell className={allTimeStyle}>{expense.allTime.totalAmount.toFixed(2)}</TableCell>
          <TableCell className={allTimeStyle}>{income.allTime.totalAmount.toFixed(2)}</TableCell>
          <TableCell className={allTimeStyle}>
            {(income.allTime.totalAmount - expense.allTime.totalAmount).toFixed(2)}
          </TableCell>
          <TableCell className={allTimeStyle}>{expense.allTime.totalItems}</TableCell>
          <TableCell className={allTimeStyle}>{income.allTime.totalItems}</TableCell>
          
        </TableRow>
      </TableBody>
    </Table>
  )

}