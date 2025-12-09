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
import { CommonTransactionStatistics } from "@/types/transaction-types";

type TransactionStatisticsTableProps = {
  statistics: CommonTransactionStatistics,
  firstHeaderKeys: [string, string, string],
  secondHeaderKeys: [string, string, string, string, string, string],
}

export const TransactionStatisticsTable = ({
  statistics,
  firstHeaderKeys,
  secondHeaderKeys
}: TransactionStatisticsTableProps) => {
  const { t } = useTranslation("common");
  const {
    title,
    allTimeIncome,
    allTimeExpense,
    periodicExpense,
    periodicIncome,
    periodicKeys,
  } = statistics;

  const headStyleLighter = cn("text-center", "bg-blue-100");
  const headStyleDarker = cn("text-center", "bg-blue-200");
  const borderLeft = "border-l border-l-black border-l-2";
  const borderRight = "border-r border-r-black border-r-2";
  const borderLeftRight = "border-x border-x-black border-x-2";
 
  const allTimeStyle = (() => {
    const totalBalance = allTimeIncome.totalAmount - allTimeExpense.totalAmount;
    const bgColor = totalBalance >= 0 ? "bg-green-300" : "bg-red-300";
    return cn("text-center", `${bgColor}`);
  })();

  const roundOrNot = (value: number) => {
    if (Number.isInteger(value)) return value;
    return Number(value.toFixed(2));
  }

  return (
    <Table className={cn("text-base", borderLeftRight)}>
      <TableHeader className="sticky top-0 z-20">
        <TableRow className="h-11">
          <TableHead className={headStyleLighter} colSpan={1}>
            {t(firstHeaderKeys[0])}
          </TableHead>
          <TableHead className={cn(headStyleLighter, borderLeftRight)} colSpan={3}>
            {t(firstHeaderKeys[1])}
          </TableHead>
          <TableHead className={headStyleLighter} colSpan={2}>
            {t(firstHeaderKeys[2])}
          </TableHead>
          
        </TableRow>
        <TableRow className="h-11">
          <TableHead className={headStyleDarker}>{t(secondHeaderKeys[0])}</TableHead>
          <TableHead className={cn(headStyleDarker, borderLeft)}>
            {t(secondHeaderKeys[1])}
          </TableHead>
          <TableHead className={headStyleDarker}>{t(secondHeaderKeys[2])}</TableHead>
          <TableHead className={cn(headStyleDarker, borderRight)}>
            {t(secondHeaderKeys[3])}
          </TableHead>
          <TableHead className={headStyleDarker}>{t(secondHeaderKeys[4])}</TableHead>
          <TableHead className={headStyleDarker}>{t(secondHeaderKeys[5])}</TableHead>
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
              <TableCell className={cn(cellStyle, borderLeft)}>
                {totalAmountExpense.toFixed(2)}
              </TableCell>
              <TableCell className={cellStyle}>{totalAmountIncome.toFixed(2)}</TableCell>
              <TableCell className={cn(cellStyle, borderRight)}>
                {totalBalance.toFixed(2)}
              </TableCell>
              <TableCell className={cellStyle}>{roundOrNot(totalItemsExpense)}</TableCell>
              <TableCell className={cellStyle}>{roundOrNot(totalItemsIncome)}</TableCell>
            </TableRow>
          )
        })}
        <TableRow key={'allTime'} className="sticky bottom-0 z-20 h-11">
          <TableCell className={allTimeStyle}>{t('allTime')}</TableCell>
          <TableCell className={cn(allTimeStyle, borderLeft)}>
            {allTimeExpense.totalAmount.toFixed(2)}
          </TableCell>
          <TableCell className={allTimeStyle}>
            {allTimeIncome.totalAmount.toFixed(2)}
          </TableCell>
          <TableCell className={cn(allTimeStyle, borderRight)}>
            {(allTimeIncome.totalAmount - allTimeExpense.totalAmount).toFixed(2)}
          </TableCell>
          <TableCell className={allTimeStyle}>
            {roundOrNot(allTimeExpense.totalItems)}
          </TableCell>
          <TableCell className={allTimeStyle}>
            {roundOrNot(allTimeIncome.totalItems)}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}