import { Outlet,useNavigation } from "react-router-dom";
import Navbar from "@/components/Organisms/Navbar";

import PageSpinner from "@/components/Atoms/PageSpinner";
export default function Layout() {
  const navigation = useNavigation();
  return (
    <div>
      <Navbar />
      {navigation.state === "loading" && <PageSpinner />}
      <Outlet />
    </div>
  );
}
