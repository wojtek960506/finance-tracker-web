"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { TransactionUpdateDTO } from "@/schemas/transaction";
import { TransactionAPI } from "@/types/transaction-types";
import { useTranslation } from "react-i18next";
import { EditTransactionForm } from "./forms";

type EdtiTransactionModalProps = {
  onEdit: (id: string, updatedTransaction: TransactionUpdateDTO | null) => Promise<void>;
  transaction: TransactionAPI | null;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

export const EditTransactionModal = (
  { onEdit, transaction, open, onOpenChange }: EdtiTransactionModalProps
) => {
  const { t } = useTranslation("common");

  if (!transaction) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{t('editTransaction')}</DialogTitle>
          <DialogDescription>{t('editTransactionDescription')}</DialogDescription>
        </DialogHeader>
        <EditTransactionForm
          onOpenChange={onOpenChange}
          onEdit={onEdit}
          transaction={transaction}
        />
      </DialogContent>
    </Dialog>
  )
}