import { NavigationMenu } from "@/components/ui/navigation-menu";
import { NavLinks } from "@/components/Molecules/NavLinks";
import LanguageSwitcher from "../Molecules/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/Atoms/Avatar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { Settings } from "lucide-react";

export default function Navbar() {
  const { i18n } = useTranslation();
  const { logout, isAuthenticated, user, isLoading } = useAuth();
  const { role } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const isHebrew = i18n.language === "he";

  const handleLogin = () => {
    navigate('/auth');
  };

  const handleLogout = () => {
    localStorage.removeItem('auth0_token');
    localStorage.removeItem('auth0_id_token');
    localStorage.removeItem('auth0_user');
    localStorage.removeItem('auth0_expires_at');
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

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
      
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        
        {isLoading ? (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        ) : isAuthenticated ? (
          <div className="flex items-center gap-2">
            {role === 'admin' && (
              <Button
                onClick={() => navigate('/admin')}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Settings className="w-4 h-4" />
                Admin
              </Button>
            )}
            {user?.picture && (
              <Avatar 
                src={user.picture} 
                alt={user.name || 'User'} 
                className="w-8 h-8"
              />
            )}
            <span className="text-sm font-medium">
              {user?.name || user?.email}
            </span>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleLogin}
            variant="default"
            size="sm"
          >
            Login
          </Button>
        )}
      </div>
    </NavigationMenu>
  );
}
