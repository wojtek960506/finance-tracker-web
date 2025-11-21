import { LoginDTO } from "@/app/login/page";
import { api } from "./axios"
import { User } from "@/types/user-types";
import { AxiosError } from "axios";

export const refreshAccessToken = async (): Promise<{ accessToken: string }> => {
  const { data } = await api.get('/auth/refresh', { withCredentials: true });
  return data;
}

export const login = async (payload: LoginDTO): Promise<{accessToken: string}> => {
  const { data } = await api.post('auth/login', payload, { withCredentials: true });
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

export const logoutOld = async (accessToken: string | null): Promise<{ success: boolean }> => {
  if (!accessToken) 
    throw new Error('No access token');

  const tmp = async (accessToken: string) => {
    const { data } = await api.post(
      '/auth/logout',
      {},
      { 
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        withCredentials: true,
      },
    );
    return data;
  }
  
  try {
    const data = await tmp(accessToken);
    return data;
  } catch {
    const { accessToken: newAccessToken } = await refreshAccessToken();
    const data = await tmp(newAccessToken);
    return data;
  }
}

const withRefresh = async (
  fn: (accessToken: string | null) => Promise<{ success: boolean }>,
  accessToken: string | null
): Promise<{ success: boolean }> => {
  try {
    const data = await fn(accessToken);
    return data;
  } catch (err: unknown) {
    const error = err as AxiosError;
    if (error.status !== 401)
      throw err;
    const { accessToken: newAccessToken } = await refreshAccessToken();
    const data = await fn(newAccessToken);
    return data
  }
}

export const logoutNoRefresh = async (
  accessToken: string | null
): Promise<{ success: boolean }> => {  
  if (!accessToken) 
    throw new Error('No access token');

  const { data } = await api.post(
    '/auth/logout',
    {},
    { 
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      withCredentials: true,
    },
  );
  return data;
}

export const logout = async (
  accessToken: string | null
): Promise<{ success: boolean }> => withRefresh(logoutNoRefresh, accessToken)
  
 