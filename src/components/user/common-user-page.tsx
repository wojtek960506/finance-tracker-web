import { useGeneralStore } from "@/store/general-store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CommonError } from "@/types/api-types";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Spinner } from "../ui/spinner";

type CommonUserPageProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  title: string;
  confirmButtonText: string;
  loadingText: string;
  nextRoutePath: string;
  nextRouteButtonText: string,
  submitMethod: (values: T) => Promise<void>;
  children: React.ReactNode;
}

export const CommonUserPage = <T extends FieldValues,>({ 
  form,
  title,
  confirmButtonText,
  loadingText,
  nextRoutePath,
  nextRouteButtonText,
  submitMethod,
  children,
}: CommonUserPageProps<T>) => {
  const router = useRouter();
  const { accessToken, isLoggingOut, _hasHydrated } = useGeneralStore();
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!_hasHydrated) return;
    
    if (accessToken && !isLoggingOut) router.replace("/transactions");
  }, [accessToken, router, _hasHydrated, isLoggingOut]);

  const onSubmit = async (values: T) => {
    setIsLoading(true);
    try {
      await submitMethod(values);
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
    <div className="flex min-h-full justify-center">
      <Card className="my-auto">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-[auto_300px] gap-3"
            >
              {children}
              {errorMsg && (
                <span className="text-destructive col-start-2 w-full">{errorMsg}</span>
              )}
              <Button className=" mt-2 col-span-2" type="submit" disabled={isLoading}>
                {isLoading ? <>{loadingText} <Spinner /></> : confirmButtonText}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => router.push(nextRoutePath)}
          >{nextRouteButtonText}</Button>
        </CardFooter>
      </Card>
    </div>
    
  )
}