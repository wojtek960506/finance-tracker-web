"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddTransactionForm } from "./forms";
import { useTranslation } from "react-i18next";
import { CommonModal } from "@/components/common/common-modal";
import { TransactionCreateDTO } from "@/schemas/transaction";

type AddTransactionModalProps = {
  onCreated: (newTxn: TransactionCreateDTO) => Promise<void>;
};

export const AddTransactionModal = ({ onCreated }: AddTransactionModalProps) => {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);
  
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
        onCreated={onCreated}
      />
    </CommonModal>
  )
}