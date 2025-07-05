import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

interface AdminSectionProps {
  role: string;
  onNavigate: (path: string) => void;
}

export const AdminSection = ({ role, onNavigate }: AdminSectionProps) => (
  <>
    {role === 'admin' && (
      <Button
        onClick={() => onNavigate('/admin')}
        variant="ghost"
        size="sm"
        className="flex items-center gap-1"
      >
        <Settings className="w-4 h-4" />
        Admin
      </Button>
    )}
    {role === 'user' && (
      <Button
        onClick={() => onNavigate('/request-editor')}
        variant="ghost"
        size="sm"
      >
        Request Editor Role
      </Button>
    )}
  </>
); 