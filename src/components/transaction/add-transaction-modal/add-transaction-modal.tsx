"use client"

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
import { DateField, TextField, NumberField, SelectField, RadioField } from "./fields";


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
      console.log('payload', payload)
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

  const PAYMENT_METHODS = [
    { key:"Cash", value: "Cash" },
    { key:"card", value: "Card" },
    { key:"blik", value: "BLIK" },
    { key:"transfer", value: "Transfer" },
    { key:"atm", value: "ATM" },
  ]

  const ACCOUNTS = [
    { key:"mbank", value: "mBank" },
    { key:"velobank", value: "VeloBank" },
    { key:"alior_bank", value: "Alior Bank" },
    { key:"credit_argicole", value: "Credit Agricole" },
    { key:"revolut", value: "Revolut" },
  ]

  const CATEGORIES = [
    { key:"food", value: "Food" },
    { key:"transport", value: "Transport" },
    { key:"recreation", value: "Recreation" },
    { key:"health", value: "Health" },
    { key:"work", value: "Work" },
  ]

  const CURRENCIES = [
    { key: "pln", value: "PLN" },
    { key: "eur", value: "EUR" },
    { key: "usd", value: "USD" },
  ]

  const TRANSACTION_TYPES = [
    { key: "expense", value: "Expense" },
    { key: "income", value: "Income" },
  ]

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
          
          <DateField
            title="Date"
            value={date}
            setValue={setDate}
            classNameMain="grid grid-cols-[3fr_5fr] gap-2"
            classNameLabel="text-sm flex items-center"
          />

          <TextField
            title="Description"
            value={description}
            setValue={setDescription}
            classNameMain="grid grid-cols-[3fr_5fr] gap-2"
            classNameLabel="text-sm flex items-center"
          />

          <NumberField 
            title="Amount"
            value={amount}
            setValue={setAmount}
            classNameMain="grid grid-cols-[3fr_5fr] gap-2"
            classNameLabel="text-sm flex items-center"
          />

          <SelectField
            title="Currency"
            value={currency}
            setValue={setCurrency}
            options={CURRENCIES}
            placeholder="Select currency"
            classNameMain="grid grid-cols-[3fr_5fr] gap-2"
            classNameLabel="w-full flex justify-center items-center"
          />

          <SelectField
            title="Category"
            value={category}
            setValue={setCategory}
            options={CATEGORIES}
            placeholder="Select category"
            classNameMain="grid grid-cols-[3fr_5fr] gap-2"
            classNameLabel="w-full flex justify-center items-center"
          />

          <SelectField
            title="Payment Method"
            value={paymentMethod}
            setValue={setPaymentMethod}
            options={PAYMENT_METHODS}
            placeholder="Select payment method"
            classNameMain="grid grid-cols-[3fr_5fr] gap-2"
            classNameLabel="w-full flex justify-center items-center"
          />

          <SelectField
            title="Account"
            value={account}
            setValue={setAccount}
            options={ACCOUNTS}
            placeholder="Select account"
            classNameMain="grid grid-cols-[3fr_5fr] gap-2"
            classNameLabel="w-full flex justify-center items-center"
          />

          <RadioField 
            title="Transaction Type"
            value={transactionType}
            setValue={setTransactionType as (v: string) => void}
            options={TRANSACTION_TYPES}
            classNameMain="grid grid-cols-[3fr_5fr] gap-2"
            classNameLabel="w-full flex justify-left items-center"
          />

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