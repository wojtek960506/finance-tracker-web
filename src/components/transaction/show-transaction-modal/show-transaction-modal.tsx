"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Transaction } from "@/types/transaction-types";
import { useTranslation } from "react-i18next";
import { TransactionDetails } from "../details/transaction-details";

type ShowTransactionModalProps = {
  transaction: Transaction | null;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

export const ShowTransactionModal = (
  { transaction, open, onOpenChange }: ShowTransactionModalProps
) => {
  const { t } = useTranslation("common");

  if (!transaction) return null;
    
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('transactionDetails')}</DialogTitle>
        </DialogHeader>
        <TransactionDetails transaction={transaction}/>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>{t('close')}</Button>
        </DialogFooter>
        
      </DialogContent>
    </Dialog>
  )
}
