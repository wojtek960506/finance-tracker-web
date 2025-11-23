"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { TransactionAPI } from "@/types/transaction-types";
import { useTranslation } from "react-i18next";
import { TransactionDetails } from "../details/transaction-details";

type DeleteTransactionModalProps = {
  onDelete: () => void;
  transaction: TransactionAPI | null;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

export const DeleteTransactionModal = (
  { onDelete, transaction, open, onOpenChange }: DeleteTransactionModalProps
) => {
  const { t } = useTranslation("common");

  if (!transaction) return null;
    
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-red-50">
        <DialogHeader>
          <DialogTitle className="text-destructive">{t('deleteTransaction')}</DialogTitle>
          <DialogDescription className="text-destructive">
            {t('deleteTransactionQuestion')}
          </DialogDescription>
        </DialogHeader>
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
        
      </DialogContent>
    </Dialog>
  )
}
