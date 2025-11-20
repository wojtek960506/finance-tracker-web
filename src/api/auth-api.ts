import { LoginDTO } from "@/app/login/page";
import { api } from "./axios"
import { User } from "@/types/user-types";

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

export const getMe = async (accessToken: string | null): Promise<User> => {
  if (!accessToken)
    throw new Error('No access token')
  
  const { data } = await api.get(
    `/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );
  return data
}
