"use client"

import { useState } from "react";
import { AddTransactionForm } from "./forms";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { CommonModal } from "@/components/common";
import { AddExchangeTransactionForm } from "./forms/add-exchange-transaction-form";
import { TransactionCreateDTO, TransactionCreateExchageDTO } from "@/schemas/transaction";

type TransactionCreationWorkflowType = "standard" | "exchange";

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
  const [workflowType, setWorkflowType] = useState<TransactionCreationWorkflowType | null>(null);
  
  const trigger = (
    <Button variant="default" className="w-min justify-self-end text-lg cursor-pointer">
      {t('newTransaction')}
    </Button>
  );

  const handleOpenChange = (value: boolean) => {
    if (value === true) setWorkflowType(null);
    setOpen(value);
  }

  let title;
  let description;
  let component;

  switch (workflowType) {
    case "exchange":
      title = 'newExchangeTransaction'
      description = 'newExchangeTransactionDescription'
      component = (
        <AddExchangeTransactionForm
          onOpenChange={handleOpenChange}
          onCreated={onExchangeCreated}
        />
      )
      break;
    case "standard":
      title = 'newStandardTransaction'
      description = 'newStandardTransactionDescription'
      component = (
        <AddTransactionForm
          onOpenChange={handleOpenChange}
          onCreated={onStandardCreated}
        />
      )
      break;
    default:
      title = 'chooseCreationWorkflow'
      description = 'chooseCreationWorkflowDescription'
      component = (
        <div className="flex flex-col gap-10">
          <Button
            variant="default"
            className="h-[100px]"
            onClick={() => setWorkflowType("standard")}  
          >
            {t('standardTransaction')}
          </Button>
          <Button
            variant="default"
            className="h-[100px]"
            onClick={() => setWorkflowType("exchange")}
          >
            {t('exchangeTransaction')}
          </Button>
        </div>
      )
      break;
  }

  return (
    <CommonModal
      open={open}
      onOpenChange={handleOpenChange}
      title={title}
      description={description}
      trigger={trigger}
    >
      {/* <AddTransactionForm
        onOpenChange={handleOpenChange}
        onCreated={onStandardCreated}
      /> */}
      {component}
    </CommonModal>
  )
}