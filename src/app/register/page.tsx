"use client"

import { createUser } from "@/api/users-api";
import { AppLayout } from "@/components/layout/app-layout";
import { UserCreateDTO, UserCreateSchema } from "@/schemas/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { CommonUserPage } from "@/components/user/common-user-page";
import { ControlledInputField } from "@/components/controlled-form";

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
  
  const submitMethod = async (values: UserCreateDTO) => {
    await createUser(values);
    toast.success(
      `User '${values.firstName} ${values.lastName}' has been successfully created`
    );
  } 

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
      >
        <ControlledInputField name="firstName" type="text" />
        <ControlledInputField name="lastName" type="text" />
        <ControlledInputField name="email" type="text" />
        <ControlledInputField name="confirmEmail" type="text" />
        <ControlledInputField name="password" type="password" />
        <ControlledInputField name="confirmPassword" type="password" />
      </CommonUserPage>
    </AppLayout>
  )
}