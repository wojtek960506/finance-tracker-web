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

type AddTransactionModalProps = {
  onCreated: (newTxn: TransactionCreateDTO) => void;
};

export const AddTransactionModal = ({ onCreated }: AddTransactionModalProps) => {
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
  
      <DialogTrigger asChild>
        <Button variant="default">Add Transaction</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>Quickly add a transaction to your ledger.</DialogDescription>
        </DialogHeader>
        <AddTransactionForm onCreated={onCreated} handleOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}