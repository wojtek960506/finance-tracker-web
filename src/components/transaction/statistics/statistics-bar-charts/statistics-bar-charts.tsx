import { ChartConfig } from "@/components/ui/chart";
import { useFormatNumber } from "@/hooks/use-format-number";
import { cn } from "@/lib/utils";
import { CommonTransactionStatistics } from "@/types/transaction-types"
import { useTranslation } from "react-i18next";
import { CommonBarChart, NonEmptyArray, TooltipFormatterType } from "./common-bar-chart";


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

  const amountTitle = isSum ? "totalAmountTransactions" : "averageAmountTransactions";
  const itemsTitle = isSum ? "totalItemsTransactions" : "averageItemsTransactions";
  
  const bars: NonEmptyArray<{ dataKey: string; fillColor: string }> = [
    { dataKey: "expense", fillColor: "var(--color-expense)" },
    { dataKey: "income", fillColor: "var(--color-income)" },
  ]

  const xAxisTickFormatter = (value: string) => (
    (periodicTitle === "month") ? t(`month${value}`) : value
  )

  const tooltipLabelFormatter = (label: string) => (
    periodicTitle === "month" ? t(`month${label}`) : label
  )

  function tooltipFormatter (isAmount: boolean) {
      return function wrapper (value: string | number, name: string) {
        return (
      <div className="flex gap-2 justify-between w-full items-center text-sm">
        <div className={cn(
          "h-4 w-4 rounded-[5]",
          name === "expense" ? "bg-[var(--color-expense)]" : "bg-[var(--color-income)]"
        )} />
        <span className="font-bold">{t(name.toString())}</span>
        <span>
          {`${formatNumber(value.toString(), 2, isAmount)}${isAmount ? ` ${currency}` : ""}`}
        </span>
      </div>
      )
    }
  }

  return (
    <div className="flex flex-col">
      <CommonBarChart
        config={chartConfig}
        data={dataAmount}
        dataKey="key"
        bars={bars}
        title={t(amountTitle)}
        xAxisTickFormatter={xAxisTickFormatter}
        tooltipLabelFormatter={tooltipLabelFormatter}
        tooltipFormatter={tooltipFormatter(true) as TooltipFormatterType}
      />
      <CommonBarChart
        config={chartConfig}
        data={dataItems}
        dataKey="key"
        bars={bars}
        title={t(itemsTitle)}
        xAxisTickFormatter={xAxisTickFormatter}
        tooltipLabelFormatter={tooltipLabelFormatter}
        tooltipFormatter={tooltipFormatter(false) as TooltipFormatterType}
      />
    </div>
  )
}