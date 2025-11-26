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

const defaultTransactionsFilterValues: TransactionQuery = {
  page: 1,
  limit: 40,
  sortBy: "date",
  sortOrder: "desc",
  startDate: undefined,
  endDate: undefined,
  minAmount: undefined,
  maxAmount: undefined,
  transactionType: undefined,
  currency: undefined,
  category: undefined,
  paymentMethod: undefined,
  account: undefined,
}

export const TransactionsFilter = () => {
  const { t } = useTranslation("common");
  const form = useForm<TransactionQuery>({
    resolver: zodResolver(TransactionQuerySchema),
    defaultValues: defaultTransactionsFilterValues,
  })
  
  const onSubmit = (values: TransactionQuery) => {
    console.log('values: ', values);
  }

  return (
    <div className="flex min-w-fit border-1 border-gray-500 rounded-xl ml-2 p-2 overflow-hidden">
      <div className="overflow-auto pr-1">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          // className="grid grid-cols-[auto_auto] gap-3"
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