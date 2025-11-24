"use client"

import { CommonFormField } from "@/components/common/common-form-field"
import { Input } from "@/components/ui/input"
import { useTranslation } from "react-i18next"

type InputFieldProps = {
  name: string,
  type: "text" | "password"
}

export const InputField = ({ name, type }: InputFieldProps) => {
  const { t } = useTranslation("common");
  return (
    <CommonFormField name={name} label={t(name)}>
      {(field) => <Input type={type} {...field} />}
    </CommonFormField>
  )
}