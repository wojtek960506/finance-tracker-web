import { ChartConfig } from "@/components/ui/chart";
import { useFormatNumber } from "@/hooks/use-format-number";
import { cn } from "@/lib/utils";
import { CommonTransactionStatistics } from "@/types/transaction-types"
import { useTranslation } from "react-i18next";
import { CommonBarChart, TooltipFormatterType } from "./common-bar-chart";
import { ReactElement } from "react";
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

  type ItemsBarDataType = {
    key: string,
    expense: number,
    income: number,
  }
  type AmountBarDataType = ItemsBarDataType & {
    balance: number,
    absBalance: number
  };

  const dataAmount: AmountBarDataType[] = [];
  const dataItems: ItemsBarDataType[] = [];
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
    });
  });

  const itemsChartConfig = {
    expense: {
      color: "#e57373",
    },
    income: {
      color: "#4caf50",
    },
  } satisfies ChartConfig;

  const amountChartConfig = {
    ...itemsChartConfig,
    balancePositive: {
      label: t('balance'),
      color: "#123456",
    },
    balanceNegative: {
      label: t('balance'),
      color: "#654321",
    },
  } satisfies ChartConfig

  const amountTitle = isSum ? "totalAmountTransactions" : "averageAmountTransactions";
  const itemsTitle = isSum ? "totalItemsTransactions" : "averageItemsTransactions";
  

  const xAxisTickFormatter = (value: string) => (
    (periodicTitle === "month") ? t(`month${value}`) : value
  )

  const tooltipLabelFormatter = (label: string) => (
    periodicTitle === "month" ? t(`month${label}`) : label
  )

  const tooltipItemsFormatter = (value: number, name: string) => {
    return (
        <div className="flex gap-2 justify-between w-full items-center text-sm">
          <div className="flex gap-2">
            <div className={cn(
              "h-4 w-4 rounded-[5]",
              name === "expense" 
                ? "bg-[var(--color-expense)]"
                : "bg-[var(--color-income)]"
            )} />
            <span className="font-bold">{t(name.toString())}</span>
          </div>
          <span>
            {`${formatNumber(value.toString(), 2, false)}`}
          </span>
        </div>
      )
  }

  
  const tooltipAmountFormatter = (value: number, name: string, item: unknown) => {
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
          {`${formatNumber(actualValue.toString(), 2, true)} ${currency}`}
        </span>
      </div>
    )
  }
  
  const barsItems: ReactElement<typeof Bar>[] = [
    <Bar key="1" dataKey="expense" fill="var(--color-expense)" radius={4} />,
    <Bar key="2" dataKey="income" fill="var(--color-income)" radius={4} />,
  ]

  const barsAmount: ReactElement<typeof Bar>[] = [
    ...barsItems,
    <Bar
      key="3"
      dataKey="absBalance"
      radius={4}
    >
      {dataAmount.map((row, i) => {
        const val = row["balance"];
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
        config={amountChartConfig}
        data={dataAmount}
        dataKey="key"
        bars={barsAmount}
        title={t(amountTitle)}
        xAxisTickFormatter={xAxisTickFormatter}
        tooltipLabelFormatter={tooltipLabelFormatter}
        tooltipFormatter={tooltipAmountFormatter as TooltipFormatterType}
      />
      <CommonBarChart
        config={itemsChartConfig}
        data={dataItems}
        dataKey="key"
        bars={barsItems}
        title={t(itemsTitle)}
        xAxisTickFormatter={xAxisTickFormatter}
        tooltipLabelFormatter={tooltipLabelFormatter}
        tooltipFormatter={tooltipItemsFormatter as TooltipFormatterType}
      />
    </div>
  )
}