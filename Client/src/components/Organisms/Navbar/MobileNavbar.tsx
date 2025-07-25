import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { cn } from "@/lib/utils";
import styles from './Navbar.module.css';
import { Auth0User } from "@/types";
import { AdminSection } from "@/components/Molecules/AdminSection";
import { ProfileSection } from "@/components/Molecules/ProfileSection";
import { LogoutButton } from "@/components/Molecules/LogoutButton";
import { LanguageSwitcher } from "@/components/Molecules/LanguageSwitcher";
import { navigationItems } from "./Navbar";

interface MobileNavbarProps {
  isAuthenticated: boolean;
  user: Auth0User | null;
  role: string;
  handleLogin: () => void;
  handleLogout: () => void;
  handleNavigate: (path: string) => void;
  isHebrew: boolean;
}

export const MobileNavbar = ({
  isAuthenticated,
  user,
  role,
  handleLogin,
  handleLogout,
  handleNavigate,
  isHebrew
}: MobileNavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className={cn(styles.mobileNav, isHebrew && styles.rtl)}>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className={styles.mobileMenuButton}>
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side={isHebrew ? "right" : "left"} className={styles.drawer}>
          <SheetHeader>
            <SheetTitle className={styles.drawerHeader}>
              <span className={styles.logo}>Keyoshi</span>
            </SheetTitle>
          </SheetHeader>

          <div className={styles.drawerContent}>
            <div className={styles.drawerNav}>
              {navigationItems.map((item) => (
                <Button
                  key={item.to}
                  variant="ghost"
                  onClick={() => {
                    handleNavigate(item.to);
                    setIsOpen(false);
                  }}
                >
                  {t(item.label)}
                </Button>
              ))}
            </div>
          </div>

          <div className={styles.drawerFooter}>
            {isAuthenticated ? (
              <>
                <AdminSection role={role} onNavigate={handleNavigate} />
                <ProfileSection user={user} />
                <div className={styles.footerRow}>
                  <LogoutButton onLogout={handleLogout} />
                  <LanguageSwitcher />
                </div>
              </>
            ) : (
              <div className={styles.footerRow}>
                <Button onClick={handleLogin} variant="default" className="w-full">
                  Login
                </Button>
                <LanguageSwitcher />
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <a href="/" className={styles.mobileLogo}>
        Keyoshi
      </a>
    </div>
  );
}; 