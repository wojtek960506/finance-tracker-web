"use client"

import { createUser } from "@/api/users-api";
import { AppLayout } from "@/components/layout/app-layout";
import { CommonInputField } from "@/components/common/common-input-field";
import { UserCreateDTO, UserCreateSchema } from "@/schemas/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { CommonUserPage } from "@/components/user/common-user-page";

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
        <CommonInputField name="firstName" type="text" />
        <CommonInputField name="lastName" type="text" />
        <CommonInputField name="email" type="text" />
        <CommonInputField name="confirmEmail" type="text" />
        <CommonInputField name="password" type="password" />
        <CommonInputField name="confirmPassword" type="password" />
      </CommonUserPage>
    </AppLayout>
  )
}