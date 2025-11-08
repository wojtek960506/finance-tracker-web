"use client"

import { TransactionCreateDTO } from "@/types/transaction-types";
import React, { useState } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DateField, TextField, NumberField, SelectField, RadioField } from "../fields";
import { 
  ACCOUNTS,
  CATEGORIES,
  CURRENCIES,
  PAYMENT_METHODS,
  TRANSACTION_TYPES
} from "@/lib/consts";

type AddTransactionFormProps = {
  onCreated: (newTxn: TransactionCreateDTO) => void;
  handleOpen: (value: boolean) => void;
};

export const AddTransactionForm = ({ onCreated, handleOpen}: AddTransactionFormProps) => {

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
      handleOpen(false);
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
    <form onSubmit={handleSubmit} className="space-y-4 mt-2">  
      <DateField
        title="Date"
        value={date}
        setValue={setDate}
      />
      <TextField
        title="Description"
        value={description}
        setValue={setDescription}
      />
      <NumberField 
        title="Amount"
        value={amount}
        setValue={setAmount}
      />
      <SelectField
        title="Currency"
        value={currency}
        setValue={setCurrency}
        options={CURRENCIES}
        placeholder="Select currency"
      />
      <SelectField
        title="Category"
        value={category}
        setValue={setCategory}
        options={CATEGORIES}
        placeholder="Select category"
      />
      <SelectField
        title="Payment Method"
        value={paymentMethod}
        setValue={setPaymentMethod}
        options={PAYMENT_METHODS}
        placeholder="Select payment method"
      />
      <SelectField
        title="Account"
        value={account}
        setValue={setAccount}
        options={ACCOUNTS}
        placeholder="Select account"
      />
      <RadioField 
        title="Transaction Type"
        value={transactionType}
        setValue={setTransactionType as (v: string) => void}
        options={TRANSACTION_TYPES}
      />
      <DialogFooter className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={() => handleOpen(false)}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Create"}
        </Button>
      </DialogFooter>
    </form>
  )
}