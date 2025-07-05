import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useEffect, useState } from "react";
import { MobileNavbar } from "./MobileNavbar";
import { DesktopNavbar } from "./DesktopNavbar";

export const navigationItems = [
  { to: "/", label: "nav.home" },
  { to: "/about", label: "nav.about" },
  { to: "/books", label: "nav.books" },
  { to: "/contact", label: "nav.contact" },
  { to: "/api", label: "nav.api" },
];

export default function Navbar() {
  const { i18n } = useTranslation();
  const { logout, isAuthenticated, user, isLoading } = useAuth();
  const { role } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const isHebrew = i18n.language === "he";
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const sharedProps = {
    isAuthenticated,
    isLoading,
    user,
    role,
    handleLogin,
    handleLogout,
    handleNavigate,
    isHebrew
  };

  if (isMobile) {
    return <MobileNavbar {...sharedProps} />;
  }

  return <DesktopNavbar {...sharedProps} />;
}
