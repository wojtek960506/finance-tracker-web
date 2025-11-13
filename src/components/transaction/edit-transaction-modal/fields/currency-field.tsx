import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TransactionUpdateDTO } from "@/schemas/transaction"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next";
import { CURRENCIES } from "@/lib/consts";

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
            <Select value={field.value} onValueChange={v => field.onChange(v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('currencyPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                {[...CURRENCIES].map(option => (
                  <SelectItem key={option} value={option}>
                    {t(`currency_options.${option}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage/>
        </FormItem>
      )}
    />
  )
}