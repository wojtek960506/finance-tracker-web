import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";

type CommonRadioProps = {
  titleKey: string,
  name: string,
  value: string,
  setValue: (value: string) => void;
  optionsKeys: string[],
}

export const CommonRadio = ({
  titleKey,
  name,
  value,
  setValue,
  optionsKeys,
}: CommonRadioProps) => {
  const { t } = useTranslation("common");
  return (
   <div className="flex flex-row gap-2">
    {optionsKeys.map(optionKey => (
      <Label key={optionKey}>
        <input
          type="radio"
          name={name}
          checked={value === optionKey}
          onChange={() => setValue(optionKey)}
        />
        <span>{t(`${titleKey}_options.${optionKey}`)}</span>
      </Label>
    ))}
  </div>
  )
}