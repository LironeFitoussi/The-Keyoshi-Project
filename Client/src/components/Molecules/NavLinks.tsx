import { NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu"
import { NavLink } from "@/components/Atoms/NavLink"
import { useTranslation } from "react-i18next";
const navigationItems = [
    { to: "/", label: "nav.home" },
    { to: "/about", label: "nav.about" },
    { to: "/contact", label: "nav.contact" },
    { to: "/books", label: "nav.books" },
]

export function NavLinks() {
    const { t } = useTranslation();
    return (
        <NavigationMenuList className="gap-6">
            {navigationItems.map((item) => (
                <NavigationMenuItem key={item.to}>
                    <NavLink to={item.to}>
                        {t(item.label)}
                    </NavLink>
                </NavigationMenuItem>
            ))}
        </NavigationMenuList>
    )
} 