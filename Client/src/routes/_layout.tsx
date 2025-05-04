import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "@/components/Organisms/Navbar";
import PageSpinner from "@/components/Atoms/PageSpinner";
import { useTranslation } from "react-i18next";

export default function Layout() {
  const navigation = useNavigation();
  const { i18n } = useTranslation();
  const isHebrew = i18n.language === 'he';

  return (
    <div dir={isHebrew ? 'rtl' : 'ltr'} className="min-h-screen">
      <Navbar />
      {navigation.state === "loading" && <PageSpinner />}
      <Outlet />
    </div>
  );
}
