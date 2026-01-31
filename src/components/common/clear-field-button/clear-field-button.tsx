import { Button } from "@/components/ui/button";


type ClearFieldButtonProps = {
  setValue: (v: string) => void;
  isDisabled?: boolean;
}

export const ClearFieldButton = ({
  setValue,
  isDisabled=false
}: ClearFieldButtonProps) => {
  return (
    <Button
      variant="ghost"
      type="button"
      onClick={(e) => {
        e.preventDefault();
        setValue("");
      }}
      className="p-1 ml-1"
      disabled={isDisabled}
      data-testid="clear-field-button"
    >
      ✕
    </Button>
  );
}