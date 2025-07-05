import { NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu"
import { NavLink } from "@/components/Atoms/NavLink"
import { useTranslation } from "react-i18next";

const navigationItems = [
    { to: "/api", label: "nav.api" },
    { to: "/books", label: "nav.books" },
    { to: "/contact", label: "nav.contact" },
    { to: "/about", label: "nav.about" },
    { to: "/", label: "nav.home" },
];

export function NavLinks() {
    const { t, i18n } = useTranslation();
    const isHebrew = i18n.language === "he";
    
    return (
        <NavigationMenuList className="gap-6">
            {(isHebrew ? navigationItems : [...navigationItems].reverse()).map((item) => (
                <NavigationMenuItem key={item.to}>
                    <NavLink to={item.to}>
                        {t(item.label)}
                    </NavLink>
                </NavigationMenuItem>
            ))}
        </NavigationMenuList>
    )
} 