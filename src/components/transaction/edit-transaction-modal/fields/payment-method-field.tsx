import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { TransactionUpdateDTO } from "@/schemas/transaction"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next";
import { PAYMENT_METHODS } from "@/lib/consts";
import { CommonSelect } from "@/components/common/common-select";

export const PaymentMethodField = () => {
  const { t } = useTranslation("common");
  const { control } = useFormContext<TransactionUpdateDTO>();

  return (
    <FormField
      control={control}
      name="paymentMethod"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('paymentMethod')}</FormLabel>
          <FormControl>
            <CommonSelect
              titleKey="paymentMethod"
              value={field.value}
              setValue={field.onChange}
              placeholderKey="paymentMethodPlaceholder"
              optionsKeys={PAYMENT_METHODS}
            />
          </FormControl>
          <FormMessage/>
        </FormItem>
      )}
    />
  )
}