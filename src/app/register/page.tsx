"use client"

import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createUser } from "@/api/users-api";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppLayout } from "@/components/layout/app-layout";
import { CommonUserPage } from "@/components/user/common-user-page";
import { ControlledInputField } from "@/components/controlled-form";
import { UserCreateDTO, UserCreateSchema } from "@/schemas/user-schema";

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
  const form = useForm<UserCreateDTO>({
    resolver: zodResolver(UserCreateSchema),
    defaultValues: defaultNewUserValues,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  const submitMethod = async (values: UserCreateDTO) => {
    await createUser(values);
    toast.success(
      `User '${values.firstName} ${values.lastName}' has been successfully created`
    );
  } 

  const isDisabled = isLoading || isRedirecting;

  return (
    <AppLayout>
      <CommonUserPage
        form={form}
        title={t('createAccount')}
        confirmButtonText={t('signUp')}
        loadingText={t('saving')}
        nextRoutePath='/login'
        nextRouteButtonText={t('doYouHaveAccount')}
        submitMethod={submitMethod}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        isRedirecting={isRedirecting}
        setIsRedirecting={setIsRedirecting}
      >
        <ControlledInputField name="firstName" type="text" isDisabled={isDisabled} />
        <ControlledInputField name="lastName" type="text" isDisabled={isDisabled} />
        <ControlledInputField name="email" type="text" isDisabled={isDisabled} />
        <ControlledInputField name="confirmEmail" type="text" isDisabled={isDisabled} />
        <ControlledInputField name="password" type="password" isDisabled={isDisabled} />
        <ControlledInputField name="confirmPassword" type="password" isDisabled={isDisabled} />
      </CommonUserPage>
    </AppLayout>
  )
}