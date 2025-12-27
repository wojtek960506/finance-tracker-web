import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { TransactionAPI } from "@/types/transaction-types";
import { deleteTransaction } from "@/api/transactions-api";
import { CommonError, FilteredResponse } from "@/types/api-types";
import { useTransactionsFilterStore } from "@/store/transactions-filter-store";

type FilteredTransactions = FilteredResponse<TransactionAPI[]>

export const useUndoableDelete = () => {

  const { t } = useTranslation("common");
  const queryClient = useQueryClient();
  const filters = useTransactionsFilterStore(s => s.filters);

  const handleDelete = (id: string, refId?: string) => {
    const waitingTime = 10 * 1000;

    const previousTransactions = queryClient.getQueryData<FilteredTransactions>(
      ["transactions", filters]
    );

    // TODO temporary from the view also the referenced transaction as it will also be deleted
    queryClient.setQueryData<FilteredTransactions>(
      ["transactions", filters],
      old => {
        if (!old) return undefined;
        return {
          ...old,
          items: old?.items.filter(txn => txn.id !== id)
        }
      }
    );
  
    const makeFinalDeletion = async () => {
      try {
        await deleteTransaction(id);
        queryClient.invalidateQueries({ queryKey: ["transcations", filters] })
        toast.success(
          refId === undefined
          ? t('transactionSuccessfullyDeleted')
          : t('exchangeTransactionAndRefSuccessfullyDeleted'),
          { description: t('actionCannotBeUndone')}
        )
      } catch (err: unknown) {
        queryClient.setQueryData<FilteredTransactions>(
          ["transactions", filters],
          previousTransactions
        );
        console.log("Deleting transaction error:", err);
        toast.error((err as CommonError).message);
      }
    }

    toast.warning(
      refId === undefined
      ? t('transactionDeleted')
      : t('exchangeTransactionAndRefDeleted'),
      {
        closeButton: true,
        description: t('doYouWantUndo'),
        duration: waitingTime,
        action: {
          label: t('undo'),
          onClick: () => {
            queryClient.setQueryData<FilteredTransactions>(
              ["transactions", filters],
              previousTransactions
            );
            toast.success(
              refId === undefined
              ? t('transactionRestored')
              : t('exchangeTranscationAndRefRestored')
            )
          }
        },
        onAutoClose: () => toast.dismiss(),
        onDismiss: async () => await makeFinalDeletion(),
      }
    )
  }

  return handleDelete;
}