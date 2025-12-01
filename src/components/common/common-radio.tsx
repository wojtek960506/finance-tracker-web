import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

type CommonRadioProps = {
  titleKey: string,
  name: string,
  value: string,
  setValue: (value: string) => void;
  optionsKeys: string[],
  isHorizontal?: boolean,
  isClearable?: boolean,
}

export const CommonRadio = ({
  titleKey,
  name,
  value,
  setValue,
  optionsKeys,
  isHorizontal = true,
  isClearable = true,
}: CommonRadioProps) => {
  const { t } = useTranslation("common");
  return (
   <div className={`flex flex-row justify-between ${isHorizontal ? "h-7" : ""} items-center`}>
    <div className={`flex flex-${isHorizontal ? "row" : "col"} gap-2`}>
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
    { value && isClearable &&
      <Button
        variant="ghost"
        onClick={(e) => {
          e.preventDefault();
          setValue("");
        }}
        className="p-1 ml-1"
      >
        ✕
      </Button>
    }
  </div>
  )
}