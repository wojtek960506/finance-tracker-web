"use client"

import { useState } from "react";
import { login } from "@/api/auth-api";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGeneralStore } from "@/store/general-store";
import { AppLayout } from "@/components/layout/app-layout";
import { LoginDTO, LoginSchema } from "@/schemas/user-schema";
import { CommonUserPage } from "@/components/user/common-user-page";
import { ControlledInputField } from "@/components/controlled-form";


const defaultLoginValues = {
  email: "",
  password: ""
}

export default function LoginPage() {
  const { t } = useTranslation("common");
  const setAccessToken = useGeneralStore(s => s.setAccessToken);
  const form = useForm<LoginDTO>({
    resolver: zodResolver(LoginSchema),
    defaultValues: defaultLoginValues
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const submitMethod = async (values: LoginDTO) => {
    const { accessToken } = await login(values);
    setAccessToken(accessToken);
  }
  
  const isDisabled = isLoading || isRedirecting;

  return (
    <AppLayout>
      <CommonUserPage
        form={form}
        title={t('login')}
        confirmButtonText={t('logIn')}
        loadingText={t('loggingIn')}
        nextRoutePath='/register'
        nextRouteButtonText={t('createAccount')}
        submitMethod={submitMethod}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        isRedirecting={isRedirecting}
        setIsRedirecting={setIsRedirecting}
      >
        <ControlledInputField name="email" type="text" isDisabled={isDisabled}/>
        <ControlledInputField name="password" type="password" isDisabled={isDisabled} />
      </CommonUserPage>
    </AppLayout>
  )
}