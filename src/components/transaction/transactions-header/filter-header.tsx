import { useTranslation } from "react-i18next";
import { useFormatNumber } from "@/hooks/use-format-number";
import { useTransactionsFilterStore } from "@/store/transactions-filter-store"


export const TransactionsFilterHeader = () => {
  const { t, i18n } = useTranslation("common");
  const filters = useTransactionsFilterStore(s => s.filters);
  const formatNumber = useFormatNumber()

  const notShownFilters = ["page", "limit", "sortBy", "sortOrder", "currency"];


  // TODO I copied this code to `statistics-header` and adjusted a little
  // think about merging it into one function - actually it might be even possible
  // to have some common component to show chosen filters
  const parseValue = (key: string, value: string | number) => {
    const currency = filters.currency

    switch (key) {
      case "startDate":
      case "endDate":
        return new Date(value).toLocaleDateString(i18n.language);
      case "minAmount":
      case "maxAmount":
        return `${formatNumber(value, 2, true)}${currency ? ` ${currency}` : ""}`;
      default:
        return t(`${key}_options.${value as string}`);
    }
  }

  return (
    <ul className="flex gap-2 text-sm">
      {
        Object.entries(filters)
          .filter(([key, value]) => !notShownFilters.includes(key) && value !== undefined)
          .sort((a, b) => t(a[0]).toUpperCase() > t(b[0]).toUpperCase() ? 1 : -1)
          .map(([key, value]) => (
            <li
              key={key}
              className="border border-2 border-black rounded-lg px-2 flex flex-col"
            >
              <span className="font-bold">{t(key)}: </span>
              <span>{parseValue(key, value)}</span>
            </li>
          )
        )
      }
    </ul>
  )
}