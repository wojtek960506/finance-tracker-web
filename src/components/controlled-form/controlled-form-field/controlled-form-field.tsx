import React from "react";
import { cn } from "@/lib/utils";
import { ControllerRenderProps, useFormContext } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/form";


type ControlledFormFieldProps = {
  name: string,
  label: string,
  showLabel?: boolean,
  isHorizontal?: boolean,
  children: (field: ControllerRenderProps) => React.ReactNode,
}

export const ControlledFormField = ({
  name,
  label,
  children,
  showLabel = true,
  isHorizontal = true,
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
