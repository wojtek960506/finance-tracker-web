import { refreshAccessToken } from "@/api/auth-api";
import { AppLayout } from "@/components/layout/app-layout"
import { TransactionsMain } from "@/components/transaction/main";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function TransactionsPage() {
  
  
  
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")

  if (!refreshToken) redirect('/login');

  const { accessToken } = await refreshAccessToken(refreshToken.value);

  console.log('accessToken', accessToken);


  return (
    <AppLayout>
      <TransactionsMain />
    </AppLayout>
  )
}