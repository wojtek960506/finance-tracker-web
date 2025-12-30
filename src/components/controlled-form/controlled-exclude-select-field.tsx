import { useTranslation } from "react-i18next";
import { ControlledFormField } from "./controlled-form-field";
import { CommonExcludeSelect, MultiOption } from "../common/common-exclude-select";


type ControlledExcludeSelectFieldProps = {
  name: string;
  options: MultiOption[];
  allInvolvedLabelKey: string;
  excludedLabelKey: string;
  isDisabled?: boolean;
  isHorizontal?: boolean;
  showLabel?: boolean;
}

export const ControlledExcludeSelectField = ({
  name,
  options,
  allInvolvedLabelKey,
  excludedLabelKey,
  isDisabled = false,
  isHorizontal = true,
  showLabel = true,
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