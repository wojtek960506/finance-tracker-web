import { useTranslation } from "react-i18next";
import { ControlledFormField } from "@/components/controlled-form";
import { CommonExcludeSelect, MultiOption } from "@/components/common";


type ControlledExcludeSelectFieldProps = {
  name: string;
  options: MultiOption[];
  excludedLabelKey: string;
  allInvolvedLabelKey: string;
  showLabel?: boolean;
  isDisabled?: boolean;
  isHorizontal?: boolean;
}

export const ControlledExcludeSelectField = ({
  name,
  options,
  excludedLabelKey,
  allInvolvedLabelKey,
  showLabel = true,
  isDisabled = false,
  isHorizontal = true,
}: ControlledExcludeSelectFieldProps) => {
  const { t } = useTranslation("common");
  
  return (
    <ControlledFormField
      name={name}
      label={t(name)}
      isHorizontal={isHorizontal}
      showLabel={showLabel}
    >
      {(field) => (
        <CommonExcludeSelect
          options={options}
          excluded={field.value ?? []}
          onChange={field.onChange}
          allInvolvedLabelKey={allInvolvedLabelKey}
          excludedLabelKey={excludedLabelKey}
          isDisabled={isDisabled}
        />
      )}
    </ControlledFormField>
  )
}