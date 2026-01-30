"use client"

import { EditTransactionForm } from "./forms";
import { useTranslation } from "react-i18next";
import { CommonModal } from "@/components/common";
import { TransactionAPI } from "@/types/transaction-types";
import { TransactionUpdateDTO } from "@/schemas/transaction";


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
      <CommonModal
        open={open}
        onOpenChange={onOpenChange}
        title={t('editTransaction')}
        description={t('editTransactionDescription')}
      >
        <EditTransactionForm
          onOpenChange={onOpenChange}
          onEdit={onEdit}
          transaction={transaction}
        />
      </CommonModal>
    )
}