import { useGetUser } from "@/hooks/use-get-user";

export const UserFullName = () => {
  const { user } = useGetUser();

  if (!user) return null;

  return (
    <div className="w-full flex gap-1 justify-end font-bold pr-2 pt-1">
      <span>{user.firstName}</span>
      <span>{user.lastName}</span>
    </div>
  )
}