import { getMe } from "@/api/auth-api"
import { useGeneralStore } from "@/store/general-store"
import { User } from "@/types/user-types"
import { useQuery } from "@tanstack/react-query"

export const useGetUser = () => {
  const accessToken = useGeneralStore(s => s.accessToken);
  const { data, isLoading, isError, error } = useQuery<User, Error>({
    queryKey: ['user'],
    queryFn: () => getMe(accessToken)
  })
  return { user: data, isLoading, isError, error }
}