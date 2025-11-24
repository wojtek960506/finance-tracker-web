"use client"

import { login } from "@/api/auth-api";
import { AppLayout } from "@/components/layout/app-layout";
import { CommonInputField } from "@/components/common/common-input-field";
import { LoginDTO, LoginSchema } from "@/schemas/user-schema";
import { useGeneralStore } from "@/store/general-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CommonUserPage } from "@/components/user/common-user-page";

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
  const submitMethod = async (values: LoginDTO) => {
    const { accessToken } = await login(values);
    setAccessToken(accessToken);
  }
  
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
      >
        <CommonInputField name="email" type="text" />
        <CommonInputField name="password" type="password" />
      </CommonUserPage>
    </AppLayout>
  )
}