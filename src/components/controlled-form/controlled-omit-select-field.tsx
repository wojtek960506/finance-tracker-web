import { useTranslation } from "react-i18next";
import { ControlledFormField } from "./controlled-form-field";
import { CommonOmitSelect, MultiOption } from "../common/common-omit-select";


type ControlledOmitSelectFieldProps = {
  name: string;
  options: MultiOption[];
  allInvolvedLabelKey: string;
  excludedLabelKey: string;
  isDisabled?: boolean;
  isHorizontal?: boolean;
  showLabel?: boolean;
}

export const ControlledOmitSelectField = ({
  name,
  options,
  allInvolvedLabelKey,
  excludedLabelKey,
  isDisabled = false,
  isHorizontal = true,
  showLabel = true,
}: ControlledOmitSelectFieldProps) => {
  const { t } = useTranslation("common");
  
  return (
    <ControlledFormField
      name={name}
      label={t(name)}
      isHorizontal={isHorizontal}
      showLabel={showLabel}
    >
      {(field) => (
        <CommonOmitSelect
          options={options}
          omitted={field.value ?? []}
          onChange={field.onChange}
          allInvolvedLabelKey={allInvolvedLabelKey}
          excludedLabelKey={excludedLabelKey}
          isDisabled={isDisabled}
        />
      )}
    </ControlledFormField>
  )
}