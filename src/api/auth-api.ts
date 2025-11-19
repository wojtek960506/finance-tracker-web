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