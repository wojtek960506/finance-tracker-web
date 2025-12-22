import z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { CommonModal } from "@/components/common";
import { DialogFooter } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { exportTransactions } from "@/api/transactions-api";
import { ControlledInputField } from "@/components/controlled-form";

const ExportFormSchema = z.object({
  baseFilename: z
    .string()
    .min(1, "filenameRequired")
    .max(30, "filenameMaxLength30")
    .regex(/^[a-zA-Z0-9-_]+$/, "filenameInvalidCharacters")
});

type ExportFormType = z.infer<typeof ExportFormSchema>;

const BASE_FILENAME = "transactions-backup";

export const ExportTransactionsModal = () => {
  
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ExportFormType>({
    resolver: zodResolver(ExportFormSchema),
    defaultValues: { baseFilename: BASE_FILENAME }
  });

  useEffect(() => {
    form.reset({ baseFilename: BASE_FILENAME });
  }, [form]);

  const handleOpenChange = (value: boolean) => {
    if (value) form.reset({ baseFilename: BASE_FILENAME });
    setOpen(value);
  }

  const handleExport = async (values: ExportFormType) => {
    try {
      setIsLoading(true);
      const data = await exportTransactions();

      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      // store the time of download in the name of the file
      const now = new Date().toISOString().replace(/[:.]/g, '-');
      a.download = `${values.baseFilename}-${now}.csv`
      a.click();
      window.URL.revokeObjectURL(url);

      toast.success('export successful');
    } catch (err: unknown) {
      console.log('some problem with export', err);
      toast.error('some problem with export');
    } finally {
      setIsLoading(false);
      handleOpenChange(false);
    }
  }

  const trigger = (
    <Button variant="secondary" className="text-lg cursor-pointer">
      {t('exportTransactions')}
    </Button>
  )

  return (  
    <CommonModal
      open={open}
      onOpenChange={handleOpenChange}
      title={t('exportTransactionModalTitle')}
      description={t('exportTransactionModalDescription')}
      trigger={trigger}
      contentClassName="w-fit pr-10"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleExport)}
          className="grid grid-cols-[auto_300px] gap-3"
        >
          <ControlledInputField name="baseFilename" type="text" />
          <DialogFooter className="col-start-2 flex-justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => handleOpenChange(false)}>
              {t('cancel')}
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? t('exporting') : t('export')}
              {isLoading && (
                <span className="w-[1em] h-[1em] inline-block">
                  <Spinner className="w-full h-full"/>
                </span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </CommonModal>
  )
}