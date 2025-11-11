"use client"

import { TransactionCreateDTO } from "@/types/transaction-types";
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
import { AddTransactionForm } from "./form";
import { useTranslation } from "react-i18next";

type AddTransactionModalProps = {
  onCreated: (newTxn: TransactionCreateDTO) => void;
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

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('newTransaction')}</DialogTitle>
          <DialogDescription>Quickly add a transaction to your ledger.</DialogDescription>
        </DialogHeader>
        <AddTransactionForm onCreated={onCreated} handleOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}