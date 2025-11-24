"use client"

import { login } from "@/api/auth-api";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { InputField } from "@/components/user/forms/fields/input-field";
import { LoginDTO, LoginSchema } from "@/schemas/user-schema";
import { useGeneralStore } from "@/store/general-store";
import { CommonError } from "@/types/api-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const defaultLoginValues = {
  email: "",
  password: ""
}

export default function LoginPage() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { accessToken, setAccessToken, isLoggingOut, _hasHydrated } = useGeneralStore();
  const form = useForm<LoginDTO>({
    resolver: zodResolver(LoginSchema),
    defaultValues: defaultLoginValues
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!_hasHydrated) return;
    
    if (accessToken && !isLoggingOut) router.replace("/transactions");
  }, [accessToken, router, _hasHydrated, isLoggingOut]);

  const onSubmit = async (values: LoginDTO) => {
    setIsLoading(true);
    try {
      const { accessToken } = await login(values);
      setAccessToken(accessToken);
      setErrorMsg(null);
      router.push('/transactions');
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
            <CardTitle>{t('login')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-[auto_300px] gap-3"
              >
                <InputField name="email" type="text" />
                <InputField name="password" type="text" />
                {errorMsg && (
                  <span className="text-destructive col-start-2 w-full">{errorMsg}</span>
                )}
                <Button className=" mt-2 col-span-2" type="submit" disabled={isLoading}>
                  {isLoading ? <>{t('loggingIn')} <Spinner /></> : t('logIn')}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => router.push('/register')}
            >{t('createAccount')}</Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  )
}