"use client"

import { useEffect, useState } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { TransactionCreateDTO } from "@/schemas/transaction";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionCreateSchema } from "@/schemas/transaction";
import { Form } from "@/components/ui/form";
import {
  AccountField,
  AmountField,
  CategoryField,
  CurrencyField,
  DateField,
  DescriptionField,
  PaymentMethodField,
  TransactionTypeField,
} from "./fields";
import { toast } from "sonner";

type AddTransactionFormProps = {
  onOpenChange: (value: boolean) => void;
  onCreated: (newTxn: TransactionCreateDTO) => Promise<void>;
};

const getEmptyTransaction = () => ({
  date: new Date().toISOString().slice(0, 10),
  description: "",
  amount: 0,
  currency: "",
  category: "",
  paymentMethod: "",
  account: "",
  transactionType: "expense",
});

export const AddTransactionForm = ({ onCreated, onOpenChange }: AddTransactionFormProps) => {

  const { t } = useTranslation("common");
  const form = useForm<TransactionCreateDTO>({
    resolver: zodResolver(TransactionCreateSchema),
    defaultValues: getEmptyTransaction()
  })
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.reset(getEmptyTransaction());
  }, [form]);

  const onSubmit = async (values: TransactionCreateDTO) => {
    setLoading(true);
    try {
      await onCreated(values);
    } catch (err) {
      toast.error((err as Error).message || "Creating transaction failed");
    } finally {
      onOpenChange(false);
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-[auto_1fr] gap-4"
      >
        <DateField />
        <DescriptionField />
        <AmountField />
        <CurrencyField />
        <CategoryField />
        <PaymentMethodField />
        <AccountField />
        <TransactionTypeField />
        <DialogFooter className="col-start-2 flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
            {t('cancel')}
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? t("saving") : t("save")}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}