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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { TextField } from "./fields/text-field";
import { DateField } from "./fields/date-field";


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
            classNameLabel="grid grid-cols-[3fr_5fr] gap-2"
            classNameSpan="text-sm flex items-center"
          />

          <TextField
            title="Description"
            value={description}
            setValue={setDescription}
            classNameLabel="grid grid-cols-[3fr_5fr] gap-2"
            classNameSpan="text-sm flex items-center"
          />

          <Label className="grid grid-cols-[3fr_5fr] gap-2">
            <span className="text-sm">Amount</span>
            <Input
              type="number"
              step="0.01"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              required
            />
          </Label>

          <div className="grid grid-cols-[3fr_5fr] gap-2">
            <Label>
              <span className="w-full flex justify-center items-center">Currency</span>
            </Label>
            <Select value={currency} onValueChange={(v) => setCurrency(v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map(c => (
                  <SelectItem key={c.key} value={c.key}>{c.value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-[3fr_5fr] gap-2">
            <Label>
              <span className="w-full flex justify-center items-center">Category</span>
            </Label>
            <Select value={category} onValueChange={(v) => setCategory(v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(c => (
                  <SelectItem key={c.key} value={c.key}>{c.value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-[3fr_5fr] gap-2">
            <Label>
              <span>Transaction Type</span>
            </Label>
            <div className="flex gap-2 items-center">
              <Label className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="type"
                  checked={transactionType === "expense"}
                  onChange={() => setTransactionType("expense")}
                />
              </Label>
              <span>Expense</span>
              <Label className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="type"
                  checked={transactionType === "income"}
                  onChange={() => setTransactionType("income")}
                />
              </Label>
              <span>Income</span>
            </div>
          </div>

          <div className="grid grid-cols-[3fr_5fr] gap-2">
            <Label>
              <span className="w-full flex justify-center items-center">Payment Method</span>
            </Label>
            <Select value={paymentMethod} onValueChange={(v) => setPaymentMethod(v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                {PAYMENT_METHODS.map(pm => (
                  <SelectItem key={pm.key} value={pm.key}>{pm.value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-[3fr_5fr] gap-2">
            <Label>
              <span className="w-full flex justify-end items-center">Account</span>
            </Label>
            <Select value={account} onValueChange={(v) => setAccount(v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {ACCOUNTS.map(a => (
                  <SelectItem key={a.key} value={a.key}>{a.value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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