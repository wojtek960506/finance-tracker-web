"use client"

import { login } from "@/api/auth-api";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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

  useEffect(() => {
    form.reset({ email: "", password: "" })
  }, [form])

  const onSubmit = async (values: LoginDTO) => {
    console.log('onSubmit', values);
    const { accessToken } = await login(values);
    console.log('accessToken', accessToken);
    localStorage.setItem("accessToken", accessToken);
    
    router.push('/transactions');
  }
  
  return (
    <AppLayout>
      <div className="flex h-screen justify-center items-center bg-blue-100">
        <Card>
          <CardHeader>
            <CardTitle>{t('login')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('email')}</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />              
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>{t('password')}</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />              
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* <CardFooter className="flex justify-start "> */}
                  <Button className="mt-4" type="submit">{t('logIn')}</Button>
                {/* </CardFooter> */}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}