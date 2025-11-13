import { CommonError } from "@/types/api-types";
import axios from "axios"


export const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  },
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
