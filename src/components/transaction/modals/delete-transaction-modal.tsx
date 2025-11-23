"use client"

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { TransactionAPI } from "@/types/transaction-types";
import { useTranslation } from "react-i18next";
import { TransactionDetails } from "../details/transaction-details";
import { CommonModal } from "@/components/common/common-modal";

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
      title={t('newTransaction')}
      titleClassName="text-destructive"
      description={t('newTransactionDescription')}
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
