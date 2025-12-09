import { useFormatNumber } from "@/hooks/use-format-number";
import { useTransactionsFilterStore } from "@/store/transactions-filter-store"
import { useTranslation } from "react-i18next";

export const TransactionsFilterHeader = () => {
  const { t, i18n } = useTranslation("common");
  const filters = useTransactionsFilterStore(s => s.filters);
  const formatNumber = useFormatNumber()

  const notShownFilters = ["page", "limit", "sortBy", "sortOrder"];

  const parseValue = (key: string, value: string | number) => {
    switch (key) {
      case "startDate":
      case "endDate":
        return new Date(value).toLocaleDateString(i18n.language);
      case "minAmount":
      case "maxAmount":
        return formatNumber(value, 2, true);
      default:
        return t(`${key}_options.${value as string}`);
    }
  }

  return (
    <ul className="flex gap-2">
      {
        Object.entries(filters)
          .filter(([key, value]) => !notShownFilters.includes(key) && value !== undefined)
          .map(([key, value]) => (
            <li
              key={key}
              className="border border-2 border-black rounded-lg px-2"
            >
              {t(key)}: {parseValue(key, value)}
            </li>
          )
        )
      }
    </ul>
  )
}