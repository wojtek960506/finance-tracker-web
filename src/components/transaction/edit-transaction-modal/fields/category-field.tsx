import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TransactionUpdateDTO } from "@/schemas/transaction"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next";
import { CATEGORIES } from "@/lib/consts";

export const CategoryField = () => {
  const { t } = useTranslation("common");
  const { control } = useFormContext<TransactionUpdateDTO>();

  return (
    <FormField
      control={control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('category')}</FormLabel>
          <FormControl>
            <Select value={field.value} onValueChange={v => field.onChange(v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('categoryPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                {[...CATEGORIES].map(option => (
                  <SelectItem key={option} value={option}>
                    {t(`category_options.${option}`)}
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