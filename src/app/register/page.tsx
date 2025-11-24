"use client"

import { createUser } from "@/api/users-api";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { InputField } from "@/components/user/forms/fields/input-field";
import { UserCreateDTO, UserCreateSchema } from "@/schemas/user-schema";
import { useGeneralStore } from "@/store/general-store";
import { CommonError } from "@/types/api-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const defaultNewUserValues = {
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
    defaultValues: defaultNewUserValues,
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
      <div className="flex min-h-full justify-center">
        <Card className="my-auto">
          <CardHeader>
            <CardTitle>{t('createAccount')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-[auto_300px] gap-3"
              >
                <InputField name="firstName" type="text" />
                <InputField name="lastName" type="text" />
                <InputField name="email" type="text" />
                <InputField name="confirmEmail" type="text" />
                <InputField name="password" type="text" />
                <InputField name="confirmPassword" type="password" />
                {errorMsg && (
                  <span className="text-destructive col-start-2 w-full">{errorMsg}</span>
                )}              
                <Button className=" mt-2 col-span-2" type="submit" disabled={isLoading}>
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