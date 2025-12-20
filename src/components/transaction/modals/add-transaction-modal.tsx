"use client"

import { useState } from "react";
import { AddTransactionForm } from "./forms";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { CommonModal } from "@/components/common";
import { TransactionCreateDTO, TransactionCreateExchageDTO } from "@/schemas/transaction";

type AddTransactionModalProps = {
  onStandardCreated: (newTxn: TransactionCreateDTO) => Promise<void>;
  onExchangeCreated: (newTxn: TransactionCreateExchageDTO) => Promise<void>;
};

export const AddTransactionModal = ({
  onStandardCreated,
  onExchangeCreated,
}: AddTransactionModalProps) => {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);

  // TODO add way to choose whether it is standard or exchange transaction
  // add new form for exchange transaction
  
  const trigger = (
    <Button variant="default" className="w-min justify-self-end text-lg">
      {t('newTransaction')}
    </Button>
  );

  return (
    <CommonModal
      open={open}
      onOpenChange={setOpen}
      title={t('newTransaction')}
      description={t('newTransactionDescription')}
      trigger={trigger}
    >
      <AddTransactionForm
        onOpenChange={setOpen}
        onCreated={onStandardCreated}
      />
    </CommonModal>
  )
}