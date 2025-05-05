import { Button } from "../ui/button";
import React from "react";

interface IconButtonProps extends React.ComponentProps<typeof Button> {
  icon: React.ReactNode;
  label?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, label, ...props }) => (
  <Button {...props} className={"flex items-center gap-1 " + (props.className || "") }>
    {icon}
    {label && <span className="hidden sm:inline">{label}</span>}
  </Button>
);

export default IconButton; 