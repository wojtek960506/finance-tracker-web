import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React from "react";
import { ControllerRenderProps, useFormContext } from "react-hook-form";

type ControlledFormFieldProps = {
  name: string,
  label: string,
  children: (field: ControllerRenderProps) => React.ReactNode,
  isHorizontal?: boolean,
}

export const ControlledFormField = ({
  name,
  label,
  children,
  isHorizontal = true,
}: ControlledFormFieldProps) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="contents">
          <FormLabel>{label}</FormLabel>
          <FormControl>{children(field)}</FormControl>
          <FormMessage className={isHorizontal ? "col-start-2" : ""}/>
        </FormItem>
      )}
    />
  )
}