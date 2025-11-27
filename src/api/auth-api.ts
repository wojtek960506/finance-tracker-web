import { LoginDTO } from "@/schemas/user-schema";
import { api } from "./axios"
import { UserAPI } from "@/types/user-types";
import { AxiosError } from "axios";
import { useGeneralStore } from "@/store/general-store";
import { toast } from "sonner";
import { CommonError } from "@/types/api-types";

let refreshPromise: Promise<{ accessToken: string }> | null = null;
let isInsideLogout: boolean = false;

const refreshAccessToken = async (): Promise<{ accessToken: string }> => {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const { data } = await api.get('/auth/refresh', { withCredentials: true });
        return data;
      } catch {
        if (!isInsideLogout)
          window.dispatchEvent(new CustomEvent("app:logout"));
        else 
          isInsideLogout = false;
      }  finally {
          refreshPromise = null;
      }
    })();
  }
  const data = await refreshPromise;
  return data;
}

export const withRefresh = async <T, U extends unknown[]>(
  fn: (...rest: U) => Promise<T>,
  ...rest: U
): Promise<T | undefined> => {
  const setAccessToken = useGeneralStore.getState().setAccessToken;
  try {
    const data = await fn(...rest);
    return data;
  } catch (err: unknown) {
    const error = err as AxiosError;
    if (error.status !== 401)
      throw err;
    let newAccessToken: string | null = null;
    try {
      const { accessToken } = await refreshAccessToken();
      newAccessToken = accessToken;
    } catch {
      toast.error("Error during refreshing access - user logged out")
      return;
    }
    setAccessToken(newAccessToken);
    const data = await fn(...rest);
    return data;
  }
}

export const login = async (payload: LoginDTO): Promise<{accessToken: string}> => {
  const { data } = await api.post('auth/login', payload, { withCredentials: true });
  return data;
}

const getMeNoRefresh = async (): Promise<UserAPI> => {
  const { data } = await api.get(`/auth/me`);
  return data;
}

const logoutNoRefresh = async (): Promise<{ success: boolean }> => {
  const { data } = await api.post('/auth/logout', {}, { withCredentials: true });
  return data;
}

export const logout = async (): Promise<{ success: boolean } | undefined> => withRefresh(logoutNoRefresh);
  
export const getMe = async (): Promise<UserAPI | undefined> => withRefresh(getMeNoRefresh);


export const logoutCore = async (isInsideRefresh: boolean): Promise<undefined> => {
  try {
    isInsideLogout = true;
    await logout();
  } catch (err: unknown) {
    if (!isInsideRefresh)
      toast.error((err as CommonError).message);
  } finally {
    isInsideLogout = false;
    const generalStore = useGeneralStore.getState();
    generalStore.setAccessToken(null);
    generalStore.setIsLoggingOut(false);
  }
}