import { LoginDTO } from "@/app/login/page";
import { api } from "./axios"
import { User } from "@/types/user-types";
import { AxiosError } from "axios";
import { useGeneralStore } from "@/store/general-store";

export const withRefresh = async <T>(
  fn: (...rest: unknown[]) => Promise<T>,
  ...rest: unknown[]
): Promise<T> => {
  const setAccessToken = useGeneralStore.getState().setAccessToken;
  try {
    const data = await fn(...rest);
    return data;
  } catch (err: unknown) {
    const error = err as AxiosError;
    if (error.status !== 401)
      throw err;
    const { accessToken: newAccessToken } = await refreshAccessToken();
    setAccessToken(newAccessToken);
    const data = await fn(...rest);
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

const getMeNoRefresh = async (): Promise<User> => {
  const { data } = await api.get(`/auth/me`);
  return data;
}

const logoutNoRefresh = async (): Promise<{ success: boolean }> => {
  const { data } = await api.post('/auth/logout', {}, { withCredentials: true });
  return data;
}

export const logout = async (): Promise<{ success: boolean }> => withRefresh(logoutNoRefresh);
  
export const getMe = async (): Promise<User> => withRefresh(getMeNoRefresh);
