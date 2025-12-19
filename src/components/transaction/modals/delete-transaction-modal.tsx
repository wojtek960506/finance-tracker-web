"use client"

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { CommonModal } from "@/components/common";
import { DialogFooter } from "@/components/ui/dialog";
import { TransactionAPI } from "@/types/transaction-types";
import { TransactionDetails } from "../details/transaction-details";


type DeleteTransactionModalProps = {
  onDelete: () => void;
  transaction: TransactionAPI | null;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

export const DeleteTransactionModal = ({
  onDelete,
  transaction,
  open,
  onOpenChange
}: DeleteTransactionModalProps) => {
  const { t } = useTranslation("common");

  if (!transaction) return null;
  
  return (
    <CommonModal
      open={open}
      onOpenChange={onOpenChange}
      contentClassName="bg-red-50"
      title={
        transaction.category === "exchange"
        ? t('deleteExchangeTransaction')
        : t('deleteTransaction')
      }
      titleClassName="text-destructive"
      description={
        transaction.category === "exchange"
        ? t('deleteExchangeTransactionDescription')
        : t('deleteTransactionDescription')
      }
      descriptionClassName="text-destructive"
    >
      <>
        <TransactionDetails transaction={transaction}/>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>{t('no')}</Button>
          <Button
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation()
              onOpenChange(false)
              onDelete();
            }}
          >{t('delete')}</Button>
        </DialogFooter>
      </>
    </CommonModal>
  )
}
