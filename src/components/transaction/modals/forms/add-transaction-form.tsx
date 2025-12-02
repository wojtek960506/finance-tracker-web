"use client"

import { useEffect, useState } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import {
  TransactionCreateDTO,
  TransactionCreateFormSchema,
  TransactionCreateFormType
} from "@/schemas/transaction";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

import { toast } from "sonner";
import { CommonError } from "@/types/api-types";
import { ControlledInputField } from "@/components/common/common-form-v2/controlled/controlled-input-field";
import { ControlledSelectField } from "@/components/common/common-form-v2/controlled/controlled-select-field";
import {
  ACCOUNTS,
  CATEGORIES,
  CURRENCIES,
  PAYMENT_METHODS,
  TRANSACTION_TYPES
} from "@/lib/consts";
import { ControlledRadioField } from "@/components/common/common-form-v2/controlled/controlled-radio-field";

type AddTransactionFormProps = {
  onOpenChange: (value: boolean) => void;
  onCreated: (newTxn: TransactionCreateDTO) => Promise<void>;
};

const getEmptyTransaction = () => ({
  date: new Date().toISOString().slice(0, 10),
  description: "",
  amount: "0",
  currency: "",
  category: "",
  paymentMethod: "",
  account: "",
  transactionType: "expense",
});

export const AddTransactionForm = ({ onCreated, onOpenChange }: AddTransactionFormProps) => {

  const { t } = useTranslation("common");
  const form = useForm<TransactionCreateFormType>({
    resolver: zodResolver(TransactionCreateFormSchema),
    defaultValues: getEmptyTransaction()
  })
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.reset(getEmptyTransaction());
  }, [form]);

  const onSubmit = async (values: TransactionCreateFormType) => {
    setLoading(true);
    try {
      await onCreated({ ...values, amount: Number(values.amount) });
    } catch (err: unknown) {
      console.log('Creating transaction error:', err);
      toast.error((err as CommonError).message || "Creating transaction failed");
    } finally {
      onOpenChange(false);
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-[auto_300px] gap-3"
      >
        <ControlledInputField name="date" type="date" />
        <ControlledInputField name="description" type="text" />
        <ControlledInputField name="amount" type="number" step={0.01} decimalPlaces={2} />
        <ControlledSelectField
          name={"currency"}
          placeholderKey={"currencyPlaceholder"}
          optionsKeys={CURRENCIES}
        />
        <ControlledSelectField
          name={"category"}
          placeholderKey={"categoryPlaceholder"}
          optionsKeys={CATEGORIES}
        />
        <ControlledSelectField
          name={"paymentMethod"}
          placeholderKey={"paymentMethodPlaceholder"}
          optionsKeys={PAYMENT_METHODS}
        />
        <ControlledSelectField
          name={"account"}
          placeholderKey={"accountPlaceholder"}
          optionsKeys={ACCOUNTS}
        />
        <ControlledRadioField
          name={"transactionType"}
          optionsKeys={TRANSACTION_TYPES}
        />
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