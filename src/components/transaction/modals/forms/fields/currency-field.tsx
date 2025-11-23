import { CommonFormField } from "@/components/common/common-form-field";
import { CommonSelect } from "@/components/common/common-select";
import { CURRENCIES } from "@/lib/consts";
import { useTranslation } from "react-i18next";

export const CurrencyField = () => {
  const { t } = useTranslation("common");
  return (
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
  )
}