import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetTransactionStatistics } from "@/hooks/use-get-transaction-statistics";
import { TransactionStatisticsFilter } from "@/schemas/transaction-statistics";
import { NoYearStatistics } from "@/types/transaction-types";
import { useTranslation } from "react-i18next";

export const NoYearNoMonthTable = (
  { filters }: { filters: TransactionStatisticsFilter }
) => {
  const { t } = useTranslation("common");

  const { data: dataExpenses } = useGetTransactionStatistics(filters, "expense");
  const { data: dataIncomes } = useGetTransactionStatistics(filters, "income");

    console.log('------------------------------------');
    console.log('filters', filters);
    console.log('expenses', dataExpenses);
    console.log('incomes', dataIncomes);
    
    console.log('------------------------------------');

  if (!dataExpenses || !dataIncomes) {
    console.log('empty expenses or empty incomes');
    return null;
  }

  const expenses = dataExpenses as NoYearStatistics;
  const incomes = dataIncomes as NoYearStatistics;

  const yearlyExpenses = expenses.yearly;
  const yearlyIncomes = incomes.yearly;

  const yearlyKeys = new Set([...Object.keys(yearlyExpenses), ...Object.keys(yearlyIncomes)]);

  console.log("#####################################################");
  console.log('yearlyKeys', yearlyKeys);
  console.log("#####################################################");

  return (
    <div>
    <Table className="text-lg">
      <TableHeader className="sticky top-0 bg-background z-10">
        <TableRow>
          <TableHead></TableHead>
          <TableHead colSpan={2} className="text-center border-x">{t('totalAmount')}</TableHead>
          <TableHead colSpan={2} className="text-center border-x">{t('totalItems')}</TableHead>
        </TableRow>
        <TableRow>
          <TableHead className="text-center border-x">{t('')}</TableHead>
          <TableHead className="text-center border-x">{t('expenses')}</TableHead>
          <TableHead className="text-center border-x">{t('incomes')}</TableHead>
          <TableHead className="text-center border-x">{t('expenses')}</TableHead>
          <TableHead className="text-center border-x">{t('incomes')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...yearlyKeys].map(year => (
          <TableRow key={year}>
            <TableCell className="text-center border-x">{year}</TableCell>
            <TableCell className="text-center border-x">{(yearlyExpenses[Number(year)]?.totalAmount ?? 0).toFixed(2)}</TableCell>
            <TableCell className="text-center border-x">{yearlyIncomes[Number(year)]?.totalAmount ?? 0}</TableCell>
            <TableCell className="text-center border-x">{yearlyExpenses[Number(year)]?.totalItems ?? 0}</TableCell>
            <TableCell className="text-center border-x">{yearlyIncomes[Number(year)]?.totalItems ?? 0}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  )

}