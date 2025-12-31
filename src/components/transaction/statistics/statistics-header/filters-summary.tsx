import { cn } from "@/lib/utils";
import { CommonTooltip } from "@/components/common";
import { useTranslation } from "react-i18next";
import { TransactionStatisticsFilter } from "@/schemas/transaction-statistics";

const RoundedLabelValue = ({ label, value }: { label: string, value: string }) => (
  <div className="px-2 py-1 border border-2 border-black rounded-lg">
    <span className="font-bold">{`${label}: `}</span>
    <span>{value}</span>
  </div>
);

type FiltersSummaryProps = {
  filters: TransactionStatisticsFilter
}

export const FiltersSummary = ({
  filters
}: FiltersSummaryProps) => {
  const { t } = useTranslation("common");

  // TODO I copied this code from `filter-header` and adjusted a little
  // think about merging it into one function
  const parseValue = (key: string, value: string | string[]) => {
    if (Array.isArray(value))
        return value.map(v => t(v)).join(",")
    
    switch (key) {
      case "currency":
      case "year":
        return value
      case "month":
        return t(`month${value}`)
      default:
        return t(`${key}_options.${value as string}`);
    }
  }

  return (
    <div className="flex gap-2 text-xs justify-start w-full">
      {Object.entries(filters)
        .filter(([, value]) => value !== undefined && value.length > 0)
        .sort(
          (a, b) => 
            t(a[0], { count: a[1].length }).toUpperCase() >
            t(b[0], { count: b[1].length }).toUpperCase()
              ? 1
              : -1
        )
        .map(([key, value]) => {
          if (key === "excludeCategories" && value.length > 1) {
            return (
              <CommonTooltip key={key}
                triggerClassName="max-w-[180px] truncate inline-block text-left"
                triggerValue={
                  <RoundedLabelValue
                    key={key}
                    label={t(key, { count: value.length })}
                    value={value.length.toString()}
                  />
                }
                contentValue={(
                  <div className={cn(
                    'flex flex-col max-h-[30vh] overflow-y-auto pr-2',
                    'scrollbar-dark'
                  )}>
                    {(value as string[])
                      .sort((a, b) =>
                        t(`category_options.${a}`) > t(`category_options.${b}`) ? 1 : -1
                      )
                      .map(v => (<span key={v}>{t(`category_options.${v}`)}</span>))
                    }
                  </div>
                )}
              />
            )
          }

          return (
            <RoundedLabelValue
              key={key}
              label={t(key, { count: value.length })}
              value={parseValue(key, value)}
            />
          )
        })
      }
    </div>
  )
}