import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useGetUser } from "@/hooks/use-get-user";
import { useEffect } from "react";
import { useGeneralStore } from "@/store/general-store";

type UserContextMenuProps = {
  onLogout: () => void;
}

export const UserContextMenu = ({ onLogout }: UserContextMenuProps) => {
  const { t, i18n } = useTranslation("common");
  const { language, setLanguage } = useGeneralStore();
  const { user } = useGetUser();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language])

  const switchLanguage = (lang: "en" | "pl") => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  }

  const chosenCn = "bg-blue-300 data-[highlighted]:bg-blue-400 data-[highlighted]:text-white"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline"
          className="h-10 w-10 rounded-full hover:bg-gray-300 bg-gray-200 text-lg">
            { user ? `${user.firstName[0]}${user.lastName[0]}` : null }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger turnedLeft={true}>{t('language')}</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem
              className={language === "en" ? chosenCn : ""}
              onClick={() => {
                switchLanguage("en")
                setLanguage("en")
              }}
            >
              {t('languageEnglish')}
            </DropdownMenuItem>
            <DropdownMenuItem
            className={language === "pl" ? chosenCn : ""}
              onClick={() => {
                switchLanguage("pl")
                setLanguage("pl")
              }}
            >
              {t('languagePolish')}
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>


        { user && (
          <DropdownMenuItem
          className="justify-end"
            onClick={(e) => {
              e.stopPropagation();
              onLogout();
            }}
          >
            {t('logout')}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}