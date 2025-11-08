import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface NumberFieldProps {
  title: string;
  value: string;
  setValue: (v: string) => void;
  classNameMain?: string;
  classNameLabel?: string;
  step?: number
}

export const NumberField = ({ 
  title,
  value,
  setValue,
  classNameMain,
  classNameLabel,
  step = 0.01
}: NumberFieldProps) => {
  return (
    <Label className={classNameMain}>
      <span className={classNameLabel}>{title}</span>
      <Input
        type="number"
        step={step}
        value={value}
        onChange={e => setValue(e.target.value)}
        required
      />
    </Label>
  )
}