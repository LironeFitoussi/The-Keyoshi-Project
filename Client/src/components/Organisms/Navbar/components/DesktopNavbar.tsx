import { NavigationMenu } from "@/components/ui/navigation-menu";
import { NavLinks } from "@/components/Molecules/NavLinks";
import LanguageSwitcher from "@/components/Molecules/LanguageSwitcher/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Auth0User } from "@/types";
import styles from '../Navbar.module.css';
import { AdminSection } from "./AdminSection";
import { ProfileSection } from "./ProfileSection";
import { LogoutButton } from "./LogoutButton";

interface DesktopNavbarProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: Auth0User | null;
  role: string;
  handleLogin: () => void;
  handleLogout: () => void;
  handleNavigate: (path: string) => void;
}

export const DesktopNavbar = ({
  isAuthenticated,
  isLoading,
  user,
  role,
  handleLogin,
  handleLogout,
  handleNavigate
}: DesktopNavbarProps) => (
  <div className={styles.desktopNav}>
    <div className={styles.leftSection}>
      <NavigationMenu>
        <NavLinks />
      </NavigationMenu>
    </div>

    <div className={styles.centerSection}>
      <a href="/" className={styles.logo}>
        Keyoshi
      </a>
    </div>

    <div className={styles.rightSection}>
      <div className={styles.controls}>
        <LanguageSwitcher />
        {isLoading ? (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        ) : isAuthenticated ? (
          <>
            <AdminSection role={role} onNavigate={handleNavigate} />
            <ProfileSection user={user} />
            <LogoutButton onLogout={handleLogout} />
          </>
        ) : (
          <Button onClick={handleLogin} variant="default" size="sm">
            Login
          </Button>
        )}
      </div>
    </div>
  </div>
); 