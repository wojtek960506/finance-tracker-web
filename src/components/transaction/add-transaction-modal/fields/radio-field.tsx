import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils"
import { useTranslation } from "react-i18next";

interface RadioFieldProps {
  title: string;
  value: string;
  setValue: (v: string) => void;
  options: Set<string>;
  classNameMain?: string;
  classNameLabel?: string;
}

const mainClassName = cn("grid grid-cols-[3fr_5fr] gap-2");
const labelClassName = cn("w-full flex justify-center items-center")

export const RadioField = ({
  title,
  value,
  setValue,
  options,
  classNameMain = mainClassName,
  classNameLabel = labelClassName,
}: RadioFieldProps) => {
  const { t } = useTranslation("common");

  return (
    <div className={classNameMain}>
      <Label>
        <span className={classNameLabel}>{t(title)}</span>
      </Label>
      <div className="flex flex-col gap-2">
        {[...options].map(option => (
          <Label key={option} className="flex gap-2 items-center">
            <input
              type="radio"
              name="type"
              checked={value === option}
              onChange={() => setValue(option)}
            />
            <span>{t(`${title}_options.${option}`)}</span>
          </Label>
        ))}
      </div>
    </div>
  )
}