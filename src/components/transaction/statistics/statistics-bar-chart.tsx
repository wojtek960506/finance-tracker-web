import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { useFormatNumber } from "@/hooks/use-format-number";
import { cn } from "@/lib/utils";
import { CommonTransactionStatistics } from "@/types/transaction-types"
import { useTranslation } from "react-i18next";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

type TransactionStatisticsBarChartsProps = {
  statistics: CommonTransactionStatistics,
  currency: string
}

export const TransactionStatisticsBarCharts = ({
  statistics,
  currency,
}: TransactionStatisticsBarChartsProps) => {
  const { t } = useTranslation("common");
  const {
    title,
    periodicExpense,
    periodicIncome,
    periodicKeys,
  } = statistics;
  const formatNumber = useFormatNumber();

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

  const chartConfig = {
    expense: {
      label: t('expense'),
      color: "#e57373",
    },
    income: {
      label: t('income'),
      color: "#4caf50",
    },
  } satisfies ChartConfig;

  return (
    <div className="flex flex-col">
      <span className="w-full text-center text-2xl py-5">{t('totalAmount')}</span>
      <ChartContainer config={chartConfig} className="flex-1 min-h-[200px] max-h-[400px]">
        <BarChart data={dataAmount}>
          <XAxis 
            dataKey="key"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            className="text-sm"
            tickFormatter={(value) => {
              if (title === "month") return t(`month${value}`);
              return value;
            }}
          />
          <YAxis
            tickLine={false}
            tickMargin={5}
            axisLine={false}
            className="text-sm"
          />
          <ChartTooltip 
            content={<ChartTooltipContent />}
            labelClassName="text-base"
            labelFormatter={(label) => title === "month" ? t(`month${label}`) : label}
            formatter={(value, name) => {
              return <div className="flex gap-2 justify-between w-full items-center text-sm">
                <div className={cn(
                  "h-4 w-4 rounded-[5]",
                  name === "expense" ? "bg-[var(--color-expense)]" : "bg-[var(--color-income)]"
                )} />
                <span className="font-bold">{t(name.toString())}</span>
                <span>{`${formatNumber(value.toString(), 2, true)} ${currency}`}</span>
              </div>
            }}
          />
          <ChartLegend
            content={(props) => (
              <ChartLegendContent payload={props.payload} className="text-base"/>
            )}
          />
          <CartesianGrid vertical={false} />
          <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
          <Bar dataKey="income" fill="var(--color-income)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}