import { getTransactionStatistics } from "@/api/transactions-api";
import { buildQueryParams } from "@/lib/utils";
import { TransactionStatisticsQuery } from "@/schemas/transaction-query";
import { TransactionStatisticsAPI } from "@/types/transaction-types";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactionIncomeStatistics = (
  filters: Omit<TransactionStatisticsQuery, "transactionType">
) => {
  const { data, isLoading, isError, error } = useQuery<
    TransactionStatisticsAPI | undefined, Error
  >({
    queryKey: ['transactionIncomeStatistics', { ...filters }],
    queryFn: () => getTransactionStatistics(
      buildQueryParams({ ...filters, transactionType: "income" })
    )
  });

  return {
    data,
    isLoading,
    isError,
    error,
  }
}