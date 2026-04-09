declare module "lucide-react" {
  import React from "react";

  interface IconProps {
    size?: number | string;
    color?: string;
    strokeWidth?: number;
    absoluteStrokeWidth?: boolean;
    className?: string;
    [key: string]: any;
  }

  export const ChevronDown: React.FC<IconProps>;
  export const ArrowRight: React.FC<IconProps>;
  export const Info: React.FC<IconProps>;
}
