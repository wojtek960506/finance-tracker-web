import { ChartConfig, ChartTooltip } from "@/components/ui/chart";
import { useFormatNumber } from "@/hooks/use-format-number";
import { cn } from "@/lib/utils";
import { CommonTransactionStatistics } from "@/types/transaction-types"
import { useTranslation } from "react-i18next";
import { CommonBarChart, NonEmptyArray, TooltipFormatterType } from "./common-bar-chart";
import { ComponentProps, ReactElement } from "react";
import { Bar, Cell } from "recharts";


type TransactionStatisticsBarChartsProps = {
  statistics: CommonTransactionStatistics,
  currency: string,
  isSum: boolean,
}

export const TransactionStatisticsBarCharts = ({
  statistics,
  currency,
  isSum,
}: TransactionStatisticsBarChartsProps) => {
  const { t } = useTranslation("common");
  const {
    periodicTitle,
    periodicExpense,
    periodicIncome,
    periodicKeys,
  } = statistics;
  const formatNumber = useFormatNumber();

  type TmpType = {
    key: string,
    expense: number,
    income: number,
    balance: number,
    absBalance: number
  }[];
  const dataAmount: TmpType = [];
  const dataItems: TmpType = [];
  periodicKeys.forEach(key => {
    const totalAmountExpense = periodicExpense[Number(key)]?.totalAmount ?? 0;
    const totalAmountIncome = periodicIncome[Number(key)]?.totalAmount ?? 0;
    const totalItemsExpense = periodicExpense[Number(key)]?.totalItems ?? 0;
    const totalItemsIncome = periodicIncome[Number(key)]?.totalItems ?? 0;

    dataAmount.push({ 
      key,
      expense: totalAmountExpense,
      income: totalAmountIncome,
      balance: totalAmountIncome - totalAmountExpense,
      absBalance: Math.abs(totalAmountIncome - totalAmountExpense)
    });
    dataItems.push({
      key,
      expense: totalItemsExpense,
      income: totalItemsIncome,
      balance: totalItemsIncome - totalItemsExpense,
      absBalance: Math.abs(totalItemsIncome - totalItemsExpense),
    });
  });

  // values in chart legend are based on this, so maybe it will be better
  // to have some custom component
  const chartConfig = {
    expense: {
      // label: t('expense'),
      color: "#e57373",
    },
    income: {
      // label: t('income'),
      color: "#4caf50",
    },
    // balance: {
    //   label: t('balance'),
    // },
    balancePositive: {
      label: t('balance'),
      color: "#123456",
    },
    balanceNegative: {
      label: t('balance'),
      color: "#654321",
    }
  } satisfies ChartConfig;

  const amountTitle = isSum ? "totalAmountTransactions" : "averageAmountTransactions";
  const itemsTitle = isSum ? "totalItemsTransactions" : "averageItemsTransactions";
  
  const barsOld: NonEmptyArray<{ dataKey: string; fillColor: string }> = [
    { dataKey: "expense", fillColor: "var(--color-expense)" },
    { dataKey: "income", fillColor: "var(--color-income)" },
    { dataKey: "balance", fillColor: "var(--color-balanceNegative)" },
  ]

  const xAxisTickFormatter = (value: string) => (
    (periodicTitle === "month") ? t(`month${value}`) : value
  )

  const tooltipLabelFormatter = (label: string) => (
    periodicTitle === "month" ? t(`month${label}`) : label
  )

  function tooltipFormatter (isAmount: boolean) {
    return function wrapper(value: number, name: string, item: unknown) {
      const actualName = name === "absBalance" ? "balance" : name;
      const actualValue = name === "absBalance"
        ? (item as { payload: { balance: number } }).payload.balance
        : value

      return (
        <div className="flex gap-2 justify-between w-full items-center text-sm">
          <div className="flex gap-2">
            <div className={cn(
              "h-4 w-4 rounded-[5]",
              name === "expense"
                ? "bg-[var(--color-expense)]"
                : name === "income"
                  ? "bg-[var(--color-income)]"
                  : actualValue >= 0
                    ? "bg-[var(--color-balancePositive)]"
                    : "bg-[var(--color-balanceNegative)]"
            )} />
            <span className="font-bold">{t(actualName.toString())}</span>
          </div>
          <span>
            {`${formatNumber(actualValue.toString(), 2, isAmount)}${isAmount ? ` ${currency}` : ""}`}
          </span>
        </div>
      )
    }
  }



  // const bars: NonEmptyArray<ReactElement<typeof Bar>> = [
  const barsAmount: ReactElement<typeof Bar>[] = [
    <Bar key="1" dataKey="expense" fill="var(--color-expense)" radius={4} />,
    <Bar key="2" dataKey="income" fill="var(--color-income)" radius={4} />,
    <Bar
      key="3"
      dataKey="absBalance"
      radius={4}
    >
      {dataAmount.map((row, i) => {
        const val = row["balance"] as number;
        return (
          <Cell
            key={i}
            fill={val >= 0 ? "var(--color-balancePositive" : "var(--color-balanceNegative"}
          />
        );
      })}
    </Bar>
  ]

  const barsItems: ReactElement<typeof Bar>[] = [
    <Bar key="1" dataKey="expense" fill="var(--color-expense)" radius={4} />,
    <Bar key="2" dataKey="income" fill="var(--color-income)" radius={4} />,
    <Bar
      key="3"
      dataKey="absBalance"
      radius={4}
    >
      {dataItems.map((row, i) => {
        const val = row["balance"] as number;
        return (
          <Cell
            key={i}
            fill={val >= 0 ? "var(--color-balancePositive" : "var(--color-balanceNegative"}
          />
        );
      })}
    </Bar>
  ]

  return (
    <div className="flex flex-col">
      <CommonBarChart
        config={chartConfig}
        data={dataAmount}
        dataKey="key"
        bars={barsAmount}
        title={t(amountTitle)}
        xAxisTickFormatter={xAxisTickFormatter}
        tooltipLabelFormatter={tooltipLabelFormatter}
        tooltipFormatter={tooltipFormatter(true) as TooltipFormatterType}
      />
      <CommonBarChart
        config={chartConfig}
        data={dataItems}
        dataKey="key"
        bars={barsItems}
        title={t(itemsTitle)}
        xAxisTickFormatter={xAxisTickFormatter}
        tooltipLabelFormatter={tooltipLabelFormatter}
        tooltipFormatter={tooltipFormatter(false) as TooltipFormatterType}
      />
    </div>
  )
}