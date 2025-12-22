import { useTranslation } from "react-i18next";
import { ControlledFormField } from "./controlled-form-field";
import { CommonSelect, SelectOption } from "../common/common-select";

type ControlledSelectFieldProps = {
  name: string;
  placeholderKey: string;
  options: SelectOption;
  isDisabled?: boolean;
  isClearable?: boolean;
  isHorizontal?: boolean;
  showLabel?: boolean;
}

export const ControlledSelectField = ({
  name,
  placeholderKey,
  options,
  isDisabled = false,
  isClearable = true,
  isHorizontal = true,
  showLabel = true,
}: ControlledSelectFieldProps) => {
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