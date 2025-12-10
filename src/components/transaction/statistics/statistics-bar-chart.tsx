import { CommonTransactionStatistics } from "@/types/transaction-types"
import { useTranslation } from "react-i18next";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type TransactionStatisticsBarChartProps = {
  statistics: CommonTransactionStatistics,
}

export const TransactionStatisticsBarChart = ({
  statistics
}: TransactionStatisticsBarChartProps) => {
  const { t } = useTranslation("common");
  const {
    title,
    allTimeIncome,
    allTimeExpense,
    periodicExpense,
    periodicIncome,
    periodicKeys,
  } = statistics;

  type TmpType = { key: string, expense: number, income: number }[];
  const dataAmount: TmpType = [];
  const dataItems: TmpType = [];
  periodicKeys.forEach(key => {
    const totalAmountExpense = periodicExpense[Number(key)]?.totalAmount ?? 0;
    const totalAmountIncome = periodicIncome[Number(key)]?.totalAmount ?? 0;
    const totalItemsExpense = periodicExpense[Number(key)]?.totalItems ?? 0;
    const totalItemsIncome = periodicIncome[Number(key)]?.totalItems ?? 0;

    dataAmount.push({ key, expense: totalAmountExpense, income: totalAmountIncome });
    dataItems.push({ key, expense: totalItemsExpense, income: totalItemsIncome });
  });

  console.log('dataAmount', dataAmount);
  console.log('dataItems', dataItems);



  return (
    <div className="flex flex-col">
      <span className="w-full text-center text-3xl py-5">{t('totalAmount')}</span>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dataAmount}>
            <XAxis dataKey="key" />
            <YAxis />
            <Tooltip />
            <Legend />

            {/* Grouped Bars */}
            <Bar dataKey="expense" fill="#f87171" />
            <Bar dataKey="income" fill="#4ade80" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <span className="w-full text-center text-3xl py-5">{t('totalItems')}</span>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dataItems}>
            <XAxis dataKey="key" />
            <YAxis />
            <Tooltip />
            <Legend />

            {/* Grouped Bars */}
            <Bar dataKey="expense" fill="#f87171" />
            <Bar dataKey="income" fill="#4ade80" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    
    </div>

    
  )
}