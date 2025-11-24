import { UserCreateDTO } from "@/schemas/user-schema";
import { UserAPI } from "@/types/user-types";
import { api } from "./axios";

export const createUser = async (payload: UserCreateDTO): Promise<UserAPI> => {
  const { data } = await api.post('/users', payload);
  return data
}