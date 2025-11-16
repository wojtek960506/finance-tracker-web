import { deleteTransaction } from "@/api/transactions-api";
import { CommonError } from "@/types/api-types";
import { Transaction } from "@/types/transaction-types";
import { useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useUndoableDelete = () => {
  const { t } = useTranslation("common");
  const queryClient = useQueryClient();

  const handleDelete = (id: string) => {
    const waitingTime = 10 * 1000;

    const previousTransactions = queryClient.getQueryData<Transaction[]>(["transactions"]);
    queryClient.setQueryData<Transaction[]>(
      ["transactions"],
      old => old?.filter(txn => txn._id !== id)
    );
  
    let undone = false;

    toast.warning(t('transactionDeleted'), {
      description: "Do you want to undo it?",
      duration: waitingTime,
      action: {
        label: t('undo'),
        onClick: () => {
          undone = true;
          queryClient.setQueryData<Transaction[]>(["transactions"], previousTransactions);
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
          console.log("Deleting transaction error:", err);
          toast.error((err as CommonError).message);
        }
      }
    }, waitingTime)
  }

  return handleDelete;
}