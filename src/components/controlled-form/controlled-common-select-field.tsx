import { ControlledFormField } from "./controlled-form-field";
import { useTranslation } from "react-i18next";
import { CommonSelect, SelectOption } from "../common/common-select";

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
        <CommonSelect
          value={field.value ?? ""}
          setValue={field.onChange}
          placeholderKey={placeholderKey}
          options={options}
          isDisabled={isDisabled}
          isClearable={isClearable}
        />
      )}
    </ControlledFormField>
  )
}