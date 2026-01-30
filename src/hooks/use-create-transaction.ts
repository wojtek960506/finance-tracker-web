import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTransactionsFilterStore } from "@/store/transactions-filter-store";
import {
  TransactionCreateDTO,
  TransactionCreateExchangeDTO,
  TransactionCreateTransferDTO,
} from "@/schemas/transaction";
import {
  createExchangeTransaction,
  createStandardTransaction,
  createTransferTransaction,
} from "@/api/transactions-api";


export const useCreateTransaction = () => {
  const { t } = useTranslation("common");
  const queryClient = useQueryClient();
  const filters = useTransactionsFilterStore(s => s.filters);


  const createStandardMutation = useMutation({
    mutationFn: (payload: TransactionCreateDTO) => createStandardTransaction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions", filters] });
      queryClient.invalidateQueries({ queryKey: ['transactionTotals', filters] });
      toast.success(t('standardTransactionCreated'));
    },
  });

  const createExchangeMutation = useMutation({
    mutationFn: (payload: TransactionCreateExchangeDTO) => createExchangeTransaction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions", filters] });
      queryClient.invalidateQueries({ queryKey: ['transactionTotals', filters] });
      toast.success(t('exchangeTransactionCreated'));
    },
  });

  const createTransferMutation = useMutation({
    mutationFn: (payload: TransactionCreateTransferDTO) => createTransferTransaction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions", filters] });
      queryClient.invalidateQueries({ queryKey: ['transactionTotals', filters] });
      toast.success(t('transferTransactionCreated'));
    }
  });

  return {
    createStandardMutation,
    createExchangeMutation,
    createTransferMutation,
  }
}