import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { TransactionUpdateDTO } from "@/schemas/transaction"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next";
import { CURRENCIES } from "@/lib/consts";
import { CommonSelect } from "@/components/common/common-select";

export const CurrencyField = () => {
  const { t } = useTranslation("common");
  const { control } = useFormContext<TransactionUpdateDTO>();

  return (
    <FormField
      control={control}
      name="currency"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('currency')}</FormLabel>
          <FormControl>
            <CommonSelect
              titleKey="currency"
              value={field.value}
              setValue={field.onChange}
              placeholderKey="currencyPlaceholder"
              optionsKeys={CURRENCIES}
            />
          </FormControl>
          <FormMessage/>
        </FormItem>
      )}
    />
  )
}