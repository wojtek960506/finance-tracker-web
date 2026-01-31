import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { ControlledFormField } from "@/components/controlled-form";


type ControlledInputFieldProps = {
  name: string,
  type: "text" | "password" | "date" | "number"
  step?: number,
  showLabel?: boolean,
  isRequired?: boolean,
  isDisabled?: boolean,
  isHorizontal?: boolean,
  decimalPlaces?: number,
}

export const ControlledInputField = ({
  name,
  type,
  step = 1,
  showLabel = true,
  decimalPlaces = 0,
  isDisabled = false,
  isHorizontal = true,
}: ControlledInputFieldProps) => {
  const { t } = useTranslation("common");

  const getValue = (value: string | undefined) => {
    if (decimalPlaces < 0)
      throw new Error("Number of decimal places in input cannot be less than 0");
    if (type !== "number") return value ?? "";
    const val = parseFloat(value ?? "");
    return  Number.isNaN(val)
      ? ""
      : String(Math.floor(val * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces));
  }

  return (
    <ControlledFormField
      name={name}
      label={t(name)}
      isHorizontal={isHorizontal}
      showLabel={showLabel}
    >
      {(field) => (
        <Input
          type={type}
          step={step}
          disabled={isDisabled}
          value={getValue(field.value)}
          onChange={e => field.onChange(getValue(e.target.value))}
        />
      )}
    </ControlledFormField>
  )
}