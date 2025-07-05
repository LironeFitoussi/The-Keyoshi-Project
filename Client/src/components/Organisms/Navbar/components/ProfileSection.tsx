import { Avatar } from "@/components/Atoms/Avatar";
import { cn } from "@/lib/utils";
import { Auth0User } from "@/types";
import styles from '../Navbar.module.css';

interface ProfileSectionProps {
  user: Auth0User | null;
  className?: string;
}

export const ProfileSection = ({ user, className }: ProfileSectionProps) => (
  <div className={cn(styles.profileSection, className)}>
    {user?.picture && (
      <Avatar 
        src={user.picture} 
        alt={user.name || 'User'} 
        className="w-8 h-8"
      />
    )}
    <span className={styles.userName}>{user?.name || user?.email}</span>
  </div>
); 