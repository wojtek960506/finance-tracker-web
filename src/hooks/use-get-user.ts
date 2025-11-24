import { getMe } from "@/api/auth-api"
import { UserAPI } from "@/types/user-types"
import { useQuery } from "@tanstack/react-query"

export const useGetUser = () => {
  const { data, isLoading, isError, error } = useQuery<UserAPI | undefined, Error>({
    queryKey: ['user'],
    queryFn: getMe
  })
  return { user: data, isLoading, isError, error }
}