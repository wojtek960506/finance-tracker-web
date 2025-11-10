"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { useTranslation } from "react-i18next";

type DeleteTransactionModalProps = {
  onDelete: () => void;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

export const DeleteTransactionModal = (
  { onDelete, open, onOpenChange }: DeleteTransactionModalProps
) => {
  // const { t } = useTranslation("common");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      
      <DialogContent className="bg-red-50">
        <DialogHeader>
          <DialogTitle>Delete transaction</DialogTitle>
          <DialogDescription>Are you sure you want to delete transaction?</DialogDescription>
        </DialogHeader>
        <div className="flex flex-row">
          <Button onClick={() => onOpenChange(false)}>No</Button>
          <Button
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation()
              onOpenChange(false)
              onDelete();
            }}
            >Delete</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
