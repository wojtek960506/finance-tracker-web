import { CardHeader, CardTitle } from "@/components/ui/card"
import { useCreateTransaction } from "@/hooks/use-create-transaction";
import { useTranslation } from "react-i18next";
import { TransactionCreateDTO } from "@/schemas/transaction";
import { TransactionsFilterHeader } from "./filter-header";
import { AddTransactionModal } from "../modals";
import { TransactionsFilterSwitch } from "./filter-switch";


export const TransactionsHeader = () => {
  const { t } = useTranslation("common");
  const createMutation = useCreateTransaction();

  return (
    <CardHeader >
      <div className="flex justify-between">
        <CardTitle className="text-2xl">
          {t('recentTransactions')}
        </CardTitle>
        <div className="flex gap-6">
          <AddTransactionModal
            onCreated={async (created: TransactionCreateDTO) => {
              await createMutation.mutateAsync(created);
            }}
          />
          <TransactionsFilterSwitch />
        </div>
        
      </div>
      <TransactionsFilterHeader />
    </CardHeader>
  )
}
