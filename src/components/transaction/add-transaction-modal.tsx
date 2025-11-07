"use client"

// import { createTransaction } from "@/api/transactions-api";
import { TransactionCreateDTO } from "@/types/transaction-types";
import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";


type AddTransactionModalProps = {
  onCreated: (newTxn: TransactionCreateDTO) => void;
};

export const AddTransactionModal = ({ onCreated }: AddTransactionModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [category, setCategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [account, setAccount] = useState("");
  const [transactionType, setTransactionType] = useState<"income" | "expense">("expense");

  const resetFields = () => {
    setDate(new Date().toISOString().slice(0, 10));
    setDescription("");
    setAmount("")
    setCurrency("")
    setCategory("")
    setPaymentMethod("")
    setAccount("")
    setTransactionType("expense")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload: TransactionCreateDTO = {
      date: new Date(date),
      description,
      amount: Number(amount),
      currency,
      category,
      transactionType,
      paymentMethod,
      account,
    }

    try {
      // const created = await createTransaction(payload);
      // onCreated?.(created);
      onCreated(payload);
      setOpen(false);
      resetFields();
    } catch (err) {
      console.log(err)
      // show toast - TODO add some error handler (some modal or what is any other good way)
      alert((err as Error).message || "Failed");
    } finally {
      setLoading(false);
    }
  }

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
  
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-2">
            <Label>
              <span className="text-sm">Date</span>
              <Input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                required
              />
            </Label>

            <Label>
              <span className="text-sm">Description</span>
              <Input
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
              />
            </Label>
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}