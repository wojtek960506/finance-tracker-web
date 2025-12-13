import { toast } from "sonner";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { exportTransactions } from "@/api/transactions-api";


export const ExportTransactionsButton = () => {
  const { t } = useTranslation("common");
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    try {
      setIsLoading(true);
      const data = await exportTransactions();

      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      // store the time of download in the name of the file
      a.download = `transactions-backup-${new Date().toISOString().replace(/[:.]/g, '-')}.csv`
      a.click();
      window.URL.revokeObjectURL(url);

      setIsLoading(false)
      toast.success('export successful');
    } catch (err: unknown) {
      console.log('some problem with export', err);
      toast.error('some problem with export');
    } finally {
      setIsLoading(false);
    }
  }

  return (  
    <Button
      variant="secondary"
      onClick={handleExport}
      className="text-lg"
      disabled={isLoading}
    >
      <span className="w-[1em] h-[1em] inline-block" />
      {t('exportTransactions')}
      <span className="w-[1em] h-[1em] inline-block">
        {isLoading && <Spinner className="w-full h-full"/>}
      </span>
    </Button>
  )
}