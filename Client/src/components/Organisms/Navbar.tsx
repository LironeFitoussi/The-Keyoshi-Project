import { NavigationMenu } from "@/components/ui/navigation-menu";
import { NavLinks } from "@/components/Molecules/NavLinks";
import LanguageSwitcher from "../Molecules/LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { i18n } = useTranslation();
  const isHebrew = i18n.language === "he";

  return (
    <NavigationMenu
      className="w-full !max-w-full px-4 py-2 flex items-center justify-between"
      dir={isHebrew ? "rtl" : "ltr"}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <NavLinks />
      <LanguageSwitcher />
    </NavigationMenu>
  );
}
