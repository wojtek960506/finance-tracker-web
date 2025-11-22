import { LoginDTO } from "@/app/login/page";
import { api } from "./axios"
import { User } from "@/types/user-types";
import { AxiosError } from "axios";
import { useGeneralStore } from "@/store/general-store";

export const withRefresh = async <T>(
  fn: (accessToken: string | null, ...rest: unknown[]) => Promise<T>,
  isLogout: boolean,
  accessToken: string | null,
  ...rest: unknown[]
): Promise<T> => {
  const setAccessToken = useGeneralStore.getState().setAccessToken;
  try {
    const data = await fn(accessToken, ...rest);
    return data;
  } catch (err: unknown) {
    const error = err as AxiosError;
    if (error.status !== 401)
      throw err;
    const { accessToken: newAccessToken } = await refreshAccessToken();
    if (!isLogout) setAccessToken(newAccessToken);
    const data = await fn(newAccessToken, ...rest);
    return data
  }
}

let refreshPromise: Promise<{ accessToken: string }> | null = null;

export const refreshAccessToken = async (): Promise<{ accessToken: string }> => {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const { data } = await api.get('/auth/refresh', { withCredentials: true });
        return data;
      } catch {
        console.log('there should be logoug here')
      } finally {
        refreshPromise = null;
      }
    })();
  }
  const data = await refreshPromise;
  return data;
}

export const login = async (payload: LoginDTO): Promise<{accessToken: string}> => {
  const { data } = await api.post('auth/login', payload, { withCredentials: true });
  return data;
}

const getMeNoRefresh = async (accessToken: string | null): Promise<User> => {
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
  return data;
}

const logoutNoRefresh = async (
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
): Promise<{ success: boolean }> => withRefresh(logoutNoRefresh, true, accessToken);
  
export const getMe = async (
  accessToken: string | null
): Promise<User> => withRefresh(getMeNoRefresh, false, accessToken);
