import { CommonFormField } from "@/components/common/common-form-field";
import { Input } from "@/components/ui/input"
import { useTranslation } from "react-i18next";

export const DescriptionField = () => {
  const { t } = useTranslation("common");
  return (
    <CommonFormField name="description" label={t("description")}>
      {(field) => <Input type="text" {...field} required/>}
    </CommonFormField>
  )
}