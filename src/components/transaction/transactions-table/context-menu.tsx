"use client"

import { MoreVertical } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

type TransactionContextMenuProps = {
  onDetailsClick: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export const TransactionContextMenu = ({
  onDetailsClick,
  onEditClick,
  onDeleteClick,
}: TransactionContextMenuProps) => {
  const { t } = useTranslation("common");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="hover:bg-gray-300 bg-gray-200 mx-2 cursor-pointer">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onDetailsClick();
          }}
        >
          {t('details')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onEditClick();
          }}
        >
          {t('edit')}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteClick();
          }}
        >
          {t('delete')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}