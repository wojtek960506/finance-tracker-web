"use client"

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTransactionsFilterStore } from "@/store/transactions-filter-store";

import { useTranslation } from "react-i18next";

export const TransactionsFilterSwitch = () => {
  const { t } = useTranslation("common");
  const { isShown, setIsShown } = useTransactionsFilterStore();

  const borderCn = "border-2 border-black rounded-lg"
  return (
    <div className={cn('flex flex-row justify-self-end items-center px-4', borderCn)}>
      <Switch
        id="filter-switch"
        checked={isShown}
        onCheckedChange={setIsShown}
        className="cursor-pointer"
      />
      <Label htmlFor="filter-switch" className="text-lg cursor-pointer pl-2">
        {t('filterPanel')}
      </Label>
    </div>
  )
}
