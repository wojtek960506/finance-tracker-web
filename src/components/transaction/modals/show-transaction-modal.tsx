"use client"

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { CommonModal } from "@/components/common";
import { DialogFooter } from "@/components/ui/dialog";
import { TransactionAPI } from "@/types/transaction-types";
import { TransactionDetails } from "../details/transaction-details";


type ShowTransactionModalProps = {
  transaction: TransactionAPI | null;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

export const ShowTransactionModal = ({
  transaction,
  open,
  onOpenChange
}: ShowTransactionModalProps) => {
  const { t } = useTranslation("common");

  if (!transaction) return null;
  
  return (
    <CommonModal
      open={open}
      onOpenChange={onOpenChange}
      title={t('transactionDetails')}
      description={t('transactionDetailsDescription')}
    >
      <>
        <TransactionDetails transaction={transaction}/>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>{t('close')}</Button>
        </DialogFooter>
      </>
    </CommonModal>
  )
}
