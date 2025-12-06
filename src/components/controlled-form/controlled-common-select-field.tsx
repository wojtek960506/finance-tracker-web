import { ControlledFormField } from "./controlled-form-field";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ClearFieldButton } from "./clear-field-button";

type SelectOption = Record<string, string>

type ControlledCommonSelectFieldProps = {
  name: string;
  placeholderKey: string;
  options: SelectOption;
  isDisabled?: boolean;
  isClearable?: boolean;
  isHorizontal?: boolean;
  showLabel?: boolean;
}

export const ControlledCommonSelectField = ({
  name,
  placeholderKey,
  options,
  isDisabled = false,
  isClearable = true,
  isHorizontal = true,
  showLabel = true,
}: ControlledCommonSelectFieldProps) => {
  const { t } = useTranslation("common");

  return (
    <ControlledFormField
      name={name}
      label={t(name)}
      isHorizontal={isHorizontal}
      showLabel={showLabel}
    >
      {(field) => (
        <div className="flex relative">
          <Select
            disabled={isDisabled}
            value={field.value ?? ""}
            onValueChange={field.onChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t(placeholderKey)} />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(options).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {t(value)}
                </SelectItem>
              ))}
            </SelectContent>
            {field.value && isClearable && !isDisabled && <ClearFieldButton field={field} />}
          </Select>
        </div>
      )}
    </ControlledFormField>
  )
}