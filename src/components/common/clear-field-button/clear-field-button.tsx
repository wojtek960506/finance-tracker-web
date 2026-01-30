import { Button } from "@/components/ui/button";

type ClearFieldButtonProps = {
  setValue: (v: string) => void;
}

export const ClearFieldButton = ({ setValue }: ClearFieldButtonProps) => {
  return (
    <Button
      variant="ghost"
      type="button"
      onClick={(e) => {
        e.preventDefault();
        setValue("");
      }}
      className="p-1 ml-1"
      data-testid="clear-field-button"
    >
      ✕
    </Button>
  )
}