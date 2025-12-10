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
import { useFormatNumber } from "@/hooks/use-format-number";

type TransactionStatisticsTableProps = {
  statistics: CommonTransactionStatistics,
  firstHeaderKeys: [string, string, string],
  secondHeaderKeys: [string, string, string, string, string, string],
  currency: string,
}

export const TransactionStatisticsTable = ({
  statistics,
  firstHeaderKeys,
  secondHeaderKeys,
  currency,
}: TransactionStatisticsTableProps) => {
  const { t } = useTranslation("common");
  const {
    periodicTitle,
    allTimeIncome,
    allTimeExpense,
    periodicExpense,
    periodicIncome,
    periodicKeys,
  } = statistics;
  const formatNumber2 = useFormatNumber();

  const headStyleLighter = cn("text-center", "bg-blue-100");
  const headStyleDarker = cn("text-center", "bg-blue-200");
  const borderLeft = "border-l border-l-black border-l-2";
  const borderRight = "border-r border-r-black border-r-2";
  const borderLeftRight = "border-x border-x-black border-x-2";
 
  const keyAllTimeStyle = (() => {
    const totalBalance = allTimeIncome.totalAmount - allTimeExpense.totalAmount;
    const bgColor = totalBalance >= 0 ? "bg-green-300" : "bg-red-300";
    return cn("text-center", `${bgColor}`);
  })();

  const allTimeStyle = cn(keyAllTimeStyle, "pr-10", "text-right");

  const formatNumber = (
    num: number | string,
    precision: number = 0,
    shouldAddPrecision: boolean = false,
  ) => {
    return `${formatNumber2(num, precision, shouldAddPrecision)} ${currency}`
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

          const keyCellStyle = (() => {
            const bgColor = totalBalance >= 0 ? "bg-green-100" : "bg-red-100";
            return cn("text-center", `${bgColor}`);
          })();

          const cellStyle = cn(keyCellStyle, "pr-10", "text-right")

          return (
            <TableRow key={key} className="h-10">
              <TableCell className={cn(keyCellStyle)}>
                {periodicTitle === "month" ? `${t(`month${key}`)}` : key}
              </TableCell>
              <TableCell className={cn(cellStyle, borderLeft)}>
                {formatNumber(totalAmountExpense, 2, true)}
              </TableCell>
              <TableCell className={cellStyle}>
                {formatNumber(totalAmountIncome, 2, true)}
              </TableCell>
              <TableCell className={cn(cellStyle, borderRight)}>
                {formatNumber(totalBalance, 2, true)}
              </TableCell>
              <TableCell className={keyCellStyle}>
                {formatNumber2(totalItemsExpense, 2, false)}  
              </TableCell>
              <TableCell className={keyCellStyle}>
                {formatNumber2(totalItemsIncome, 2, false)}
              </TableCell>
            </TableRow>
          )
        })}
        <TableRow key={'allTime'} className="sticky bottom-0 z-20 h-11">
          <TableCell className={keyAllTimeStyle}>{t('allTime')}</TableCell>
          <TableCell className={cn(allTimeStyle, borderLeft)}>
            {formatNumber(allTimeExpense.totalAmount, 2, true)}
          </TableCell>
          <TableCell className={allTimeStyle}>
            {formatNumber(allTimeIncome.totalAmount, 2, true)}
          </TableCell>
          <TableCell className={cn(allTimeStyle, borderRight)}>
            {formatNumber(allTimeIncome.totalAmount - allTimeExpense.totalAmount, 2, true)}
          </TableCell>
          <TableCell className={keyAllTimeStyle}>
            {formatNumber2(allTimeExpense.totalItems, 2, false)}
          </TableCell>
          <TableCell className={keyAllTimeStyle}>
            {formatNumber2(allTimeIncome.totalItems, 2, false)}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}