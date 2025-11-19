import { LoginDTO } from "@/app/login/page";
import { api } from "./axios"

export const refreshAccessToken = async (
  refreshToken: string
): Promise<{ accessToken: string }> => {
  const { data } = await api.get(
    '/auth/refresh',
    { 
      headers: {
        Cookie: `refreshToken=${refreshToken}`
      }
    }
  );
  return data;
}

export const login = async (payload: LoginDTO): Promise<{accessToken: string}> => {
  const { data } = await api.post(
    'auth/login',
    payload,
    { withCredentials: true }
  );
  return data
}
