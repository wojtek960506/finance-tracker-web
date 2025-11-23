"use client"

import { TransactionCreateAPI } from "@/types/transaction-types";
import { useEffect, useState } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  ACCOUNTS,
  CATEGORIES,
  CURRENCIES,
  PAYMENT_METHODS,
  TRANSACTION_TYPES
} from "@/lib/consts";
import { useTranslation } from "react-i18next";
import { TransactionCreateDTO } from "@/schemas/transaction";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionCreateSchema } from "@/schemas/transaction";
import { Form } from "@/components/ui/form";
import { CommonFormField } from "@/components/common/common-form/form-field";
import { CommonSelect } from "@/components/common/common-select";
import { Label } from "@/components/ui/label";
import { AmountField, DateField, DescriptionField } from "./fields";
import { toast } from "sonner";

type AddTransactionFormProps = {
  onCreated: (newTxn: TransactionCreateAPI) => Promise<void>;
  handleOpen: (value: boolean) => void;
};

const defaultValues = {
  date: new Date().toISOString().slice(0, 10),
  description: "",
  amount: 0,
  currency: "",
  category: "",
  paymentMethod: "",
  account: "",
  transactionType: "expense" as "expense" | "income",
  }

export const AddTransactionForm = ({ onCreated, handleOpen}: AddTransactionFormProps) => {

  const { t } = useTranslation("common");
  const form = useForm<TransactionCreateDTO>({
    resolver: zodResolver(TransactionCreateSchema),
    defaultValues
  })
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.reset(defaultValues);
  }, [form]);

  const onSubmit = async (values: TransactionCreateDTO) => {
    setLoading(true);
    try {
      const { date, transactionType, amount, ...rest } = values;
      await onCreated({
        ...rest,
        date: new Date(date),
        amount: Number(amount),
        transactionType: transactionType as "expense" | "income"
      });
      form.reset(defaultValues);
    } catch (err) {
      toast.error((err as Error).message || "Creating transaction failed");
    } finally {
      handleOpen(false);
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

 
        <CommonFormField name="currency" label={t("currency")}>
          {(field) => (
            <CommonSelect 
              titleKey="currency"
              value={field.value}
              setValue={field.onChange}
              placeholderKey="currencyPlaceholder"
              optionsKeys={CURRENCIES}  
            />
          )}
        </CommonFormField>

        <CommonFormField name="category" label={t("category")}>
          {(field) => (
            <CommonSelect 
              titleKey="category"
              value={field.value}
              setValue={field.onChange}
              placeholderKey="categoryPlaceholder"
              optionsKeys={CATEGORIES}  
            />
          )}
        </CommonFormField>

        <CommonFormField name="paymentMethod" label={t("paymentMethod")}>
          {(field) => (
            <CommonSelect 
              titleKey="paymentMethod"
              value={field.value}
              setValue={field.onChange}
              placeholderKey="paymentMethodPlaceholder"
              optionsKeys={PAYMENT_METHODS}  
            />
          )}
        </CommonFormField>

        <CommonFormField name="account" label={t("account")}>
          {(field) => (
            <CommonSelect 
              titleKey="account"
              value={field.value}
              setValue={field.onChange}
              placeholderKey="accountPlaceholder"
              optionsKeys={ACCOUNTS}  
            />
          )}
        </CommonFormField>

        <CommonFormField name="transactionType" label={t("transactionType")}>
          {(field) => (
            <div className="flex flex-row gap-2">
              {[...TRANSACTION_TYPES].map(option => (
                <Label key={option}>
                  <input
                    type="radio"
                    name="type"
                    checked={field.value === option}
                    onChange={() => field.onChange(option)}
                  />
                  <span>{t(`transactionType_options.${option}`)}</span>
                </Label>
              ))}
            </div>
          )}
        </CommonFormField>

        <DialogFooter className="col-start-2 flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={() => handleOpen(false)}>
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