import { NavigationMenu } from "@/components/ui/navigation-menu"
import { NavLinks } from "@/components/Molecules/NavLinks"

export default function Navbar() {
    return (
        <NavigationMenu className="w-full justify-start px-4 py-2">
            <NavLinks />
        </NavigationMenu>
    )
}