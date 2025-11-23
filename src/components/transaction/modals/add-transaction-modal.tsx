"use client"

import { TransactionCreateAPI } from "@/types/transaction-types";
import { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AddTransactionForm } from "./forms";
import { useTranslation } from "react-i18next";

type AddTransactionModalProps = {
  onCreated: (newTxn: TransactionCreateAPI) => Promise<void>;
};

export const AddTransactionModal = ({ onCreated }: AddTransactionModalProps) => {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="w-min justify-self-end text-lg">
          {t('newTransaction')}
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{t('newTransaction')}</DialogTitle>
          <DialogDescription>{t('newTransactionDescription')}</DialogDescription>
        </DialogHeader>
        <AddTransactionForm
          onOpenChange={setOpen}
          onCreated={onCreated}
        />
      </DialogContent>
    </Dialog>
  )
}