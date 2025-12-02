import { Button } from "@/components/ui/button";
import { ControllerRenderProps } from "react-hook-form";

export const ClearFieldButton = ({ field }: { field: ControllerRenderProps}) => {
  return (
    <Button
      variant="ghost"
      type="button"
      onClick={(e) => {
        e.preventDefault();
        field.onChange("");
      }}
      className="p-1 ml-1"
    >
      ✕
    </Button>
  )
}