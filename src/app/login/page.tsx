"use client"

import { login } from "@/api/auth-api";
import { CommonFormField } from "@/components/common/common-form-field";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGeneralStore } from "@/store/general-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type LoginDTO = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const { t } = useTranslation("common");
  const form = useForm<LoginDTO>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" }
  });
  const router = useRouter();
  const { accessToken, setAccessToken, isLoggingOut, _hasHydrated } = useGeneralStore();

  useEffect(() => {
    // store values has to be hydrated from localStorage because at the refresh
    // of the page they are rendered like for the first time with default values
    if (!_hasHydrated) return;
    
    if (accessToken && !isLoggingOut) router.replace("/transactions");
  }, [accessToken, router, _hasHydrated, isLoggingOut]);

  useEffect(() => {
    form.reset({ email: "", password: "" })
  }, [form])

  const onSubmit = async (values: LoginDTO) => {
    const { accessToken } = await login(values);
    setAccessToken(accessToken);
    router.push('/transactions');
  }
  
  return (
    <AppLayout>
      <div className="flex h-screen justify-center items-center bg-blue-50">
        <Card>
          <CardHeader>
            <CardTitle>{t('login')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-[auto_1fr] gap-4"
              >
                <CommonFormField name="email" label={t("email")}>
                  {(field) => <Input type="text" {...field} />}
                </CommonFormField>
                <CommonFormField name="password" label={t("password")}>
                  {(field) => <Input type="password" {...field} />}
                </CommonFormField>
                <Button className="mt-1 col-start-2" type="submit">{t('logIn')}</Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => router.push('/register')}
            >{t('createNewAccount')}</Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  )
}