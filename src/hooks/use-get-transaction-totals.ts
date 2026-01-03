import { buildQueryParams } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useGeneralStore } from "@/store/general-store";
import { getTransactionTotals } from "@/api/transactions-api";
import { TransactionTotalsAPI } from "@/types/transaction-types";
import { useTransactionsFilterStore } from "@/store/transactions-filter-store"


export const  useGetTransactionTotals = () => {
  const filters = useTransactionsFilterStore(s => s.filters);
  const { accessToken, isLoggingOut } = useGeneralStore();
  const { data, isLoading, isError, error } = useQuery<
    TransactionTotalsAPI | undefined, Error
  >({
    queryKey: ['transactionTotals', filters],
    queryFn: () => getTransactionTotals(buildQueryParams(filters)),
    // this prevents getting transaction totals when filters are cleared during logout
    enabled: !!accessToken && !isLoggingOut,
  })

  return {
    data,
    isLoading,
    isError,
    error,
  }
}