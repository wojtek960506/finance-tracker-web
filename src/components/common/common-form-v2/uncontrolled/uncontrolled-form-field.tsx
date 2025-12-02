import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React from "react";

type UncontrolledFormFieldProps = {
  label: string,
  children: React.ReactNode,
  isHorizontal?: boolean,
}

export const UncontrolledFormField = ({
  label,
  children,
  isHorizontal = true
}: UncontrolledFormFieldProps) => {
  return (
    <FormItem className="contents">
      <FormLabel>{label}</FormLabel>
      <FormControl>
        {children}
      </FormControl>
      <FormMessage className={isHorizontal ? "" : "col-start-2"}/>
    </FormItem>
  )
}