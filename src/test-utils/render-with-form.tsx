import { render } from "@testing-library/react";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";


export function renderWithForm(
  ui: React.ReactElement,
  { onMethods }: { onMethods?: (methods: UseFormReturn) => void } = {},
  defaultValues: Record<string, unknown> = {},
) {

  function FormWrapper({ children }: { children: React.ReactNode }) {
    const methods = useForm({ defaultValues });
    onMethods?.(methods);
    return <FormProvider {...methods}>{children}</FormProvider>;
  }

  return render(ui, { wrapper: FormWrapper });
}
