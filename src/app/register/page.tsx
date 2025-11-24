"use client"

import { createUser } from "@/api/users-api";
import { CommonFormField } from "@/components/common/common-form-field";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { UserCreateDTO, UserCreateSchema } from "@/schemas/user-schema";
import { useGeneralStore } from "@/store/general-store";
import { CommonError } from "@/types/api-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";


const emptyUserValues = {
  firstName: "",
  lastName: "",
  email: "",
  confirmEmail: "",
  password: "",
  confirmPassword: "",
}

export default function RegisterPage() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { accessToken, isLoggingOut, _hasHydrated } = useGeneralStore();
  const form = useForm<UserCreateDTO>({
    resolver: zodResolver(UserCreateSchema),
    defaultValues: emptyUserValues,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);


  useEffect(() => {
    if (!_hasHydrated) return;
    
    if (accessToken && !isLoggingOut) router.replace("/transactions");
  }, [accessToken, router, _hasHydrated, isLoggingOut]);

  const onSubmit = async (values: UserCreateDTO) => {
    setIsLoading(true);
    try {
      await createUser(values);
      toast.success(`User '${values.firstName} ${values.lastName}' has been successfully created`);
      setErrorMsg(null);
      router.push('/login');
    } catch (err: unknown) {
      const errorMessage = (err as CommonError).message
      console.log(errorMessage);
      toast.error(errorMessage);
      setErrorMsg(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AppLayout>
      {/* <div className="flex h-full justify-center items-center bg-blue-50 overflow-auto"> */}
      {/* <div className="flex flex-1 h-full bg-blue-50 "> */}
      {/* <div className="p-6 h-full flex justify-center"> */}
      <div className="flex min-h-full justify-center">
        {/* <Card className="max-h-[calc(100vh-56px)] overflow-y-auto min-h-[200px]"> */}
        {/* <Card className="w-full max-w-lg mx-auto"> */}
        <Card className="my-auto">
          <CardHeader>
            <CardTitle>{t('createNewAccount')}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col overflow-y-auto min-h-[200px]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col overflow-y-auto min-h-[100px]"
              >
                {/* <div className="grid grid-cols-[auto_1fr] gap-4 overflow-x-hidden overflow-y-auto"> */}
                <div className="grid grid-cols-[auto_1fr] gap-4">
                  <CommonFormField name="firstName" label={t("firstName")}>
                    {(field) => <Input type="text" {...field} />}
                  </CommonFormField>
                  <CommonFormField name="lastName" label={t("lastName")}>
                    {(field) => <Input type="text" {...field} />}
                  </CommonFormField>


                  <CommonFormField name="email" label={t("email")}>
                    {(field) => <Input type="text" {...field} />}
                  </CommonFormField>
                  <CommonFormField name="confirmEmail" label={t("confirmEmail")}>
                    {(field) => <Input type="text" {...field} />}
                  </CommonFormField>
                  
                  <CommonFormField name="password" label={t("password")}>
                    {(field) => <Input type="password" {...field} />}
                  </CommonFormField>
                  <CommonFormField name="confirmPassword" label={t("confirmPassword")}>
                    {(field) => <Input type="password" {...field} />}
                  </CommonFormField>

                  
                </div>

                {errorMsg && (
                    <span
                      className="mt-4 text-destructive w-full justify-self-end break-words whitespace-normal"
                    >{errorMsg}</span>
                  )}

                <Button className="mt-4 col-start-2" type="submit">
                  {isLoading ? <>{t('saving')} <Spinner /></> : t('signUp')}
                </Button>
              </form>
            </Form>

            
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => router.push('/login')}
            >{t('doYouHaveAccount')}</Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  )
}