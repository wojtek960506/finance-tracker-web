import { getMe } from "@/api/auth-api"
import { User } from "@/types/user-types"
import { useQuery } from "@tanstack/react-query"

export const useGetUser = () => {
  const { data, isLoading, isError, error } = useQuery<User | undefined, Error>({
    queryKey: ['user'],
    queryFn: getMe
  })
  return { user: data, isLoading, isError, error }
}