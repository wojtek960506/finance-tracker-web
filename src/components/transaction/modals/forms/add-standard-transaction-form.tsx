"use client"

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Form } from "@/components/ui/form";
import { useTranslation } from "react-i18next";
import { CommonError } from "@/types/api-types";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ACCOUNT_OPTIONS,
  CATEGORY_OPTIONS,
  CURRENCY_CODE_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
  TRANSACTION_TYPES
} from "@/lib/consts";
import {
  TransactionCreateDTO,
  TransactionCreateFormType,
  TransactionCreateFormSchema,
} from "@/schemas/transaction";
import {
  ControlledSelectField,
  ControlledInputField,
  ControlledRadioField,
} from "@/components/controlled-form";


type AddStandardTransactionFormProps = {
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

export const AddStandardTransactionForm = ({
  onCreated,
  onOpenChange
}: AddStandardTransactionFormProps) => {

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
          options={CURRENCY_CODE_OPTIONS}
        />
        <ControlledSelectField
          name={"category"}
          placeholderKey={"categoryPlaceholder"}
          options={CATEGORY_OPTIONS}
        />
        <ControlledSelectField
          name={"paymentMethod"}
          placeholderKey={"paymentMethodPlaceholder"}
          options={PAYMENT_METHOD_OPTIONS}
        />
        <ControlledSelectField
          name={"account"}
          placeholderKey={"accountPlaceholder"}
          options={ACCOUNT_OPTIONS}
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