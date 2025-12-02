import { useTranslation } from "react-i18next";
import { ControlledFormField } from "./controlled-form-field";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ClearFieldButton } from "./clear-field-button";


type ControlledRadioFieldProps = {
  name: string;
  optionsKeys: Set<string>;
  isDisabled?: boolean;
  isClearable?: boolean;
  isHorizontal?: boolean;
}

export const ControlledRadioField = ({
  name,
  optionsKeys,
  isDisabled = false,
  isClearable = true,
  isHorizontal = true,
}: ControlledRadioFieldProps) => {
  const { t } = useTranslation("common");

  return (
    <ControlledFormField name={name} label={t(name)} isHorizontal={isHorizontal}>
      {(field) => (
        <RadioGroup
          onValueChange={field.onChange}
          value={field.value ?? ""}
          className={`flex flex-row ${isHorizontal ? "h-7" : ""} items-center justify-between`}
        >
          <div className={`flex flex-${isHorizontal ? "row" : "col"} gap-2`}>
            {[...optionsKeys].map(optionKey => (
              <div key={optionKey} className="flex gap-2">
                <RadioGroupItem value={optionKey} id={optionKey} />
                <Label htmlFor={optionKey}>{t(`${name}_options.${optionKey}`)}</Label>
              </div>
            ))}
          </div>
          {field.value && isClearable && !isDisabled && <ClearFieldButton field={field} />}
        </RadioGroup>
      )}
    </ControlledFormField>
  )
}