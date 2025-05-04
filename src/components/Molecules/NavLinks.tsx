import { NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu"
import { NavLink } from "@/components/Atoms/NavLink"

const navigationItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/books", label: "Books" },
]

export function NavLinks() {
    return (
        <NavigationMenuList className="gap-6">
            {navigationItems.map((item) => (
                <NavigationMenuItem key={item.to}>
                    <NavLink to={item.to}>
                        {item.label}
                    </NavLink>
                </NavigationMenuItem>
            ))}
        </NavigationMenuList>
    )
} 