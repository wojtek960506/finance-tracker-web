import { useGeneralStore } from "@/store/general-store";
import { CommonError } from "@/types/api-types";
import axios from "axios"

console.log('base api url:', process.env.NEXT_PUBLIC_API_BASE_URL);

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
})

// global response interceptor for errors
api.interceptors.response.use(
  res => res,
  err => {
    const status = err.status;
    let message: string;
    let details: unknown = undefined;

    const errData = err.response?.data
    if (errData) {
      message = errData.message;
      details = errData.details;
    } else {
      message = err.message || "Unknown server error";
    }
    const commonError: CommonError = {
      message,
      status,
      details
    }
    return Promise.reject(commonError); 
  }
);

// attach accessToken to every request if exists
api.interceptors.request.use(config => {
  const accessToken = useGeneralStore.getState().accessToken;
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`
  }
  return config;
})
