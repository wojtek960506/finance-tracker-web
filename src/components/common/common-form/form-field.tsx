import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React from "react";
import { ControllerRenderProps, useFormContext } from "react-hook-form";

type CommonFormFieldProps = {
  name: string,
  label: string,
  children: (field: ControllerRenderProps) => React.ReactNode
}

export const CommonFormField = ({
  name,
  label,
  children,
}: CommonFormFieldProps) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="contents">
          <FormLabel>{label}</FormLabel>
          <FormControl>{children(field)}</FormControl>
          <FormMessage className="col-start-2"/>
        </FormItem>
      )}
    />
  )
}