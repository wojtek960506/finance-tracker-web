import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { TotalAmountAndItems, TotalAmountAndItemsObj } from "@/types/transaction-types";

export type AdjustableStatisticsColumnTitle = "" | "month" | "year";

export type CommonTransactionStatistics = {
  title: AdjustableStatisticsColumnTitle,
  allTimeExpense: TotalAmountAndItems,
  allTimeIncome: TotalAmountAndItems,
  periodicExpense: TotalAmountAndItemsObj,
  periodicIncome: TotalAmountAndItemsObj,
  periodicKeys: string[],
}

export const CommonTransactionStatisticsTable = (
  { statistics }: { statistics: CommonTransactionStatistics}
) => {
  const { t } = useTranslation("common");
  const {
    title,
    allTimeIncome,
    allTimeExpense,
    periodicExpense,
    periodicIncome,
    periodicKeys,
  } = statistics;

  const headStyleDarker = cn("text-center", "bg-blue-100");
 
  const allTimeStyle = (() => {
    const totalBalance = allTimeIncome.totalAmount - allTimeExpense.totalAmount;
    const bgColor = totalBalance >= 0 ? "bg-green-300" : "bg-red-300";
    return cn("text-center", `${bgColor}`);
  })();

  return (
    <Table className="text-base">
      <TableHeader className="sticky top-0 z-20">
        <TableRow className="h-11">
          <TableHead className={headStyleDarker}>{t(title)}</TableHead>
          <TableHead className={headStyleDarker}>{t('expenseAmount')}</TableHead>
          <TableHead className={headStyleDarker}>{t('incomeAmount')}</TableHead>
          <TableHead className={headStyleDarker}>{t('balanceAmount')}</TableHead>
          <TableHead className={headStyleDarker}>{t('expenseItems')}</TableHead>
          <TableHead className={headStyleDarker}>{t('incomeItems')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...periodicKeys].map(key => {
          
          const totalAmountExpense = periodicExpense[Number(key)]?.totalAmount ?? 0;
          const totalAmountIncome = periodicIncome[Number(key)]?.totalAmount ?? 0;
          const totalItemsExpense = periodicExpense[Number(key)]?.totalItems ?? 0;
          const totalItemsIncome = periodicIncome[Number(key)]?.totalItems ?? 0;
          const totalBalance = totalAmountIncome - totalAmountExpense;

          const cellStyle = (() => {
            const bgColor = totalBalance >= 0 ? "bg-green-100" : "bg-red-100";
            return cn("text-center", `${bgColor}`);
          })();

          return (
            <TableRow key={key} className="h-10">
              <TableCell className={cellStyle}>
                {title === "month" ? `${t(`month${key}`)}` : key}
              </TableCell>
              <TableCell className={cellStyle}>{totalAmountExpense.toFixed(2)}</TableCell>
              <TableCell className={cellStyle}>{totalAmountIncome.toFixed(2)}</TableCell>
              <TableCell className={cellStyle}>{totalBalance.toFixed(2)}</TableCell>
              <TableCell className={cellStyle}>{totalItemsExpense}</TableCell>
              <TableCell className={cellStyle}>{totalItemsIncome}</TableCell>
            </TableRow>
          )
        })}
        <TableRow key={'allTime'} className="sticky bottom-0 z-20 h-11">
          <TableCell className={allTimeStyle}>{t('allTime')}</TableCell>
          <TableCell className={allTimeStyle}>
            {allTimeExpense.totalAmount.toFixed(2)}
          </TableCell>
          <TableCell className={allTimeStyle}>
            {allTimeIncome.totalAmount.toFixed(2)}
          </TableCell>
          <TableCell className={allTimeStyle}>
            {(allTimeIncome.totalAmount - allTimeExpense.totalAmount).toFixed(2)}
          </TableCell>
          <TableCell className={allTimeStyle}>{allTimeExpense.totalItems}</TableCell>
          <TableCell className={allTimeStyle}>{allTimeIncome.totalItems}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )

}