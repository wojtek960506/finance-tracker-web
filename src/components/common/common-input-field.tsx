"use client"

import { CommonFormField } from "@/components/common/common-form-field"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"

type InputFieldProps = {
  name: string,
  type: "text" | "password" | "date" | "number"
}

export const CommonInputField = ({ name, type }: InputFieldProps) => {
  const { t } = useTranslation("common");
  const form = useFormContext();

  const registerProps = 
    type === "number"
    ? form.register(name, {
        setValueAs: v => (v === "" ? undefined : Number(v)),
      })
    : type === "date"
      ? form.register(name, {
          setValueAs: v => (v === "" ? undefined : v),
        })
      : form.register(name);

  return (
    <CommonFormField name={name} label={t(name)}>
      {(field) => (
        <Input
          {...field}
          type={type}
          value={field.value ?? undefined}
          {...registerProps}
          onChange={(e) => field.onChange(e.target.value)}
        />
      )}
    </CommonFormField>
  )
}