import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import React from "react";
import { ControllerRenderProps, useFormContext } from "react-hook-form";

type ControlledFormFieldProps = {
  name: string,
  label: string,
  children: (field: ControllerRenderProps) => React.ReactNode,
  isHorizontal?: boolean,
  showLabel?: boolean,
}

export const ControlledFormField = ({
  name,
  label,
  children,
  isHorizontal = true,
  showLabel = true
}: ControlledFormFieldProps) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="contents">
          {showLabel && <FormLabel>{label}</FormLabel>}
          <FormControl>{children(field)}</FormControl>
          <FormMessage className={cn(isHorizontal ? "col-start-2" : "", "break-words")}/>
        </FormItem>
      )}
    />
  )
}