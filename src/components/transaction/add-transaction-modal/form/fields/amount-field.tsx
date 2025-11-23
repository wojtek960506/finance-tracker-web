import { CommonFormField } from "@/components/common/common-form/form-field";
import { Input } from "@/components/ui/input"
import { useTranslation } from "react-i18next";

export const AmountField = () => {
  const { t } = useTranslation("common");
  return (
    <CommonFormField name="amount" label={t("amount")}>
      {(field) => (
        <Input
          type="number"
          {...field}
          step="0.01"
          required 
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            field.onChange(Number.isNaN(val) ? "" : Math.floor(val * 100) / 100);
          }}
        />
      )}
    </CommonFormField>
  )
}