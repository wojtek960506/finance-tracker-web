"use client"

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { TransactionAPI } from "@/types/transaction-types";
import { useTranslation } from "react-i18next";
import { TransactionDetails } from "../details/transaction-details";
import { CommonModal } from "@/components/common/common-modal";

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
