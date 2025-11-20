import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useGetUser } from "@/hooks/use-get-user";

type UserContextMenuProps = {
  onLogout: () => void;
}

export const UserContextMenu = ({ onLogout }: UserContextMenuProps) => {
  const { t } = useTranslation("common");
  const { user } = useGetUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline"
          className="hover:bg-gray-300 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
            { user ? `${user.firstName[0]}${user.lastName[0]}` : null }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuItem>
          {t('settings')}
        </DropdownMenuItem>
        { user && <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onLogout();
          }}
        >
          {t('logout')}
        </DropdownMenuItem>}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}