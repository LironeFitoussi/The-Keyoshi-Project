import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

interface NavLinkProps {
    to: string;
    children: React.ReactNode;
}

export function NavLink({ to, children }: NavLinkProps) {
    return (
        <Link 
            to={to} 
            className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
            )}
        >
            {children}
        </Link>
    )
} 