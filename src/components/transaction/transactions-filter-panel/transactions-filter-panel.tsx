import { CommonInputField } from "@/components/common/common-input-field"
import { TransactionQuery, TransactionQuerySchema } from "@/schemas/transaction-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import {
  AccountField,
  CategoryField,
  CurrencyField,
  PaymentMethodField,
  TransactionTypeField
} from "../modals/forms/fields"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { useTransactionsFilterStore } from "@/store/transactions-filter-store"
import { areObjectsEqual } from "@/lib/utils"

export const TransactionsFilterPanel = () => {
  const { t } = useTranslation("common");
  const { filters, setFilters, setIsShown } = useTransactionsFilterStore();
  const form = useForm<TransactionQuery>({
    resolver: zodResolver(TransactionQuerySchema),
    defaultValues: JSON.parse(JSON.stringify(filters))
  })  

  const onSubmit = (values: TransactionQuery) => {
    if (!areObjectsEqual(values, filters)) setFilters(values);
    setIsShown(false);
  }

  const handleClick = () => {
    const raw = form.getValues();
    for (const [key, value] of Object.entries(raw)) {
      if (value === "") form.setValue(key as keyof TransactionQuery, undefined)
    }
    // zod validation runs when calling form.handleSubmit
    form.handleSubmit(
      (data) => {
        console.log("AFTER validation:", data);
        onSubmit(data);
      },
      (errors) => {
        console.log("Validation errors:", errors);
      }
    )();
  };

  const mcn = "flex min-w-fit border-1 border-gray-500 rounded-xl ml-2 p-2 overflow-hidden";
  return (
    <div className={mcn}>
      <div className="overflow-auto pr-1">
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleClick();
          }}
          className="flex h-full flex-col justify-between"
        >
          <div className="grid grid-cols-[auto_auto] gap-3">
            <CommonInputField name="startDate" type="date" />
            <CommonInputField name="endDate" type="date" />
            <CommonInputField name="minAmount" type="number" />
            <CommonInputField name="maxAmount" type="number" />

            <CurrencyField />
            <CategoryField />
            <PaymentMethodField />
            <AccountField />
            <TransactionTypeField />
          </div>
          <Button className="col-span-2 mt-4" type="submit">{t("apply")}</Button>
        </form>
      </Form>
      </div>
    </div>
  )
}