import { CheckCircle, Clock } from "lucide-react";

interface StatusIconProps {
  isTranslated: boolean;
}

const StatusIcon = ({ isTranslated }: StatusIconProps) =>
  isTranslated ? (
    <CheckCircle className="text-green-500 w-5 h-5" />
  ) : (
    <Clock className="text-gray-400 w-5 h-5" />
  );

export default StatusIcon; 