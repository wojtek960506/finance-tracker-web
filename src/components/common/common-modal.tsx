import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import React from "react";

type CommonModalProps = {
  open: boolean,
  onOpenChange: (value: boolean) => void;
  contentClassName?: string;
  title: string;
  titleClassName?: string;
  description: string;
  descriptionClassName?: string;
  children: React.ReactNode;
  trigger?: React.ReactNode;
}

export const CommonModal = ({
  open,
  onOpenChange,
  contentClassName = "",
  title,
  titleClassName = "",
  description,
  descriptionClassName = "",
  children,
  trigger,
}: CommonModalProps) => {


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className={cn(contentClassName, "max-h-[90%] overflow-y-auto gap-3")}>
        <DialogHeader>
          <DialogTitle className={titleClassName}>{title}</DialogTitle>
          <DialogDescription className={descriptionClassName}>
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}