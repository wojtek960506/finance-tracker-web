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
import { useTranslation } from "react-i18next";
import { sleep } from "@/lib/utils";

type AddTransactionFormProps = {
  onCreated: (newTxn: TransactionCreateDTO) => void;
  handleOpen: (value: boolean) => void;
};

export const AddTransactionForm = ({ onCreated, handleOpen}: AddTransactionFormProps) => {

  const { t } = useTranslation("common");
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
      await sleep(1000);
      onCreated(payload);
      resetFields();
    } catch (err) {
      console.log(err)
      // show toast - TODO add some error handler (some modal or what is any other good way)
      alert((err as Error).message || "Failed");
    } finally {
      handleOpen(false);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-2">  
      <DateField
        title={t("date")}
        value={date}
        setValue={setDate}
      />
      <TextField
        title={t("description")}
        value={description}
        setValue={setDescription}
      />
      <NumberField
        title={t("amount")}
        value={amount}
        setValue={setAmount}
      />
      <SelectField
        title="currency"
        value={currency}
        setValue={setCurrency}
        options={CURRENCIES}
        placeholder={t("currencyPlaceholder")}
      />
      <SelectField
        title="category"
        value={category}
        setValue={setCategory}
        options={CATEGORIES}
        placeholder={t("categoryPlaceholder")}
      />
      <SelectField
        title="paymentMethod"
        value={paymentMethod}
        setValue={setPaymentMethod}
        options={PAYMENT_METHODS}
        placeholder={t("paymentMethodPlaceholder")}
      />
      <SelectField
        title="account"
        value={account}
        setValue={setAccount}
        options={ACCOUNTS}
        placeholder={t("accountPlaceholder")}
      />
      <RadioField 
        title="transactionType"
        value={transactionType}
        setValue={setTransactionType as (v: string) => void}
        options={TRANSACTION_TYPES}
      />
      <DialogFooter className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={() => handleOpen(false)}>
          {t('cancel')}
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? t("saving") : t("save")}
        </Button>
      </DialogFooter>
    </form>
  )
}