import { getMe } from "@/api/auth-api"
import { User } from "@/types/user-types"
import { useQuery } from "@tanstack/react-query"

export const useGetUser = (accessToken: string) => {
  const { data, isLoading, isError, error } = useQuery<User, Error>({
    queryKey: ['user'],
    queryFn: () => getMe(accessToken)
  })
  return { data, isLoading, isError, error }
}