import { CommonFormField } from "@/components/common/common-form-field";
import { Input } from "@/components/ui/input"
import { useTranslation } from "react-i18next";

export const DateField = () => {
  const { t } = useTranslation("common");
  return (
    <CommonFormField name="date" label={t("date")}>
      {(field) => <Input type="date" {...field} required/>}
    </CommonFormField>
  )
}