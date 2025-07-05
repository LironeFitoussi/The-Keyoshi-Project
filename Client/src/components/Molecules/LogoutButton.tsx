import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import styles from '../Organisms/Navbar/Navbar.module.css';

interface LogoutButtonProps {
  onLogout: () => void;
}

export const LogoutButton = ({ onLogout }: LogoutButtonProps) => (
  <Button
    onClick={onLogout}
    variant="destructive"
    size="sm"
    className={styles.logoutButton}
  >
    <LogOut className="w-4 h-4" />
    Logout
  </Button>
); 