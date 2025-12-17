import { deleteTransaction } from "@/api/transactions-api";
import { CommonError } from "@/types/api-types";
import { TransactionAPI } from "@/types/transaction-types";
import { useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useUndoableDelete = () => {

  // TODO when deleting transaction it is not removed from the list
  // probably some problem with missing `filters` as key in queryClient
  // TODO for the toast with option to undo add the closing button for faster deletion
  // (also make sure that the interval is closed earlier in that case and in general to close
  // one toast and open the other even with no closing button flow)

  const { t } = useTranslation("common");
  const queryClient = useQueryClient();

  const handleDelete = (id: string) => {
    const waitingTime = 10 * 1000;

    const previousTransactions = queryClient.getQueryData<TransactionAPI[]>(["transactions"]);
    queryClient.setQueryData<TransactionAPI[]>(
      ["transactions"],
      old => old?.filter(txn => txn.id !== id)
    );
  
    let undone = false;

    toast.warning(t('transactionDeleted'), {
      description: "Do you want to undo it?",
      duration: waitingTime,
      action: {
        label: t('undo'),
        onClick: () => {
          undone = true;
          queryClient.setQueryData<TransactionAPI[]>(["transactions"], previousTransactions);
          toast.success(t('transactionRestored'))
        }
      },
    })

    setTimeout(async () => {
      if (!undone) {
        try {
          await deleteTransaction(id);
          queryClient.invalidateQueries({ queryKey: ["transcations"] })
          toast.success(
            t('transactionSuccessfullyDeleted'),
            { description: t('actionCannotBeUndone')}
          )
        } catch (err: unknown) {
          queryClient.setQueryData<TransactionAPI[]>(["transactions"], previousTransactions);
          console.log("Deleting transaction error:", err);
          toast.error((err as CommonError).message);
        }
      }
    }, waitingTime)
  }

  return handleDelete;
}