import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils"

interface RadioFieldProps {
  title: string;
  value: string;
  setValue: (v: string) => void;
  options: { key: string, value: string }[];
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
  return (
    <div className={classNameMain}>
      <Label>
        <span className={classNameLabel}>{title}</span>
      </Label>
      <div className="flex flex-col gap-2">
        {options.map(option => (
          <Label key={option.key} className="flex gap-2 items-center">
            <input
              type="radio"
              name="type"
              checked={value === option.key}
              onChange={() => setValue(option.key)}
            />
            <span>{option.value}</span>
          </Label>
        ))}
      </div>
    </div>
  )
}