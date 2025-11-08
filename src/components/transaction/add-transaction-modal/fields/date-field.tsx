import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface DateFieldProps {
  title: string;
  value: string;
  setValue: (v: string) => void;
  classNameMain?: string;
  classNameLabel?: string;
}

const mainClassName = cn("grid grid-cols-[3fr_5fr] gap-2");
const labelClassName = cn("w-full flex justify-center items-center")

export const DateField = ({ 
  title,
  value,
  setValue,
  classNameMain = mainClassName,
  classNameLabel = labelClassName,
}: DateFieldProps) => {
  return (
    <Label className={classNameMain}>
      <span className={classNameLabel}>{title}</span>
      <Input
        type="date"
        value={value}
        onChange={e => setValue(e.target.value)}
        required
      />
    </Label>
  )
}