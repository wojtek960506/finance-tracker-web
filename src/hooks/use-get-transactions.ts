import { buildQueryParams } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { FilteredResponse } from "@/types/api-types";
import { useGeneralStore } from "@/store/general-store";
import { getTransactions } from "@/api/transactions-api";
import { TransactionAPI } from "@/types/transaction-types";
import { useTransactionsFilterStore } from "@/store/transactions-filter-store";


export const useGetTransactions = () => {
  const filters = useTransactionsFilterStore(s => s.filters);
  const { accessToken, isLoggingOut } = useGeneralStore();
  const { data, isLoading, isError, error } = useQuery<
    FilteredResponse<TransactionAPI[]> | undefined, Error
  >({
    queryKey: ['transactions', filters],
    queryFn: () => getTransactions(buildQueryParams(filters)),
    // this prevents getting transactions when filters are cleared during logout
    enabled: !!accessToken && !isLoggingOut,
  })
  return {
    data,
    isLoading,
    isError,
    error
  }
}