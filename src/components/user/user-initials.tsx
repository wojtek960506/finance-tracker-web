"use client"

import { useGetUser } from "@/hooks/use-get-user";

export const UserInitials = () => {
  const { user } = useGetUser();
  return (<>{ user ? `${user.firstName[0]}${user.lastName[0]}` : null }</>);
}