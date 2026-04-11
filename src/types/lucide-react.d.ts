declare module "lucide-react" {
  import React from "react";

  interface IconProps {
    size?: number | string;
    color?: string;
    strokeWidth?: number;
    absoluteStrokeWidth?: boolean;
    className?: string;
    [key: string]: unknown;
  }

  export const ChevronDown: React.FC<IconProps>;
  export const ArrowRight: React.FC<IconProps>;
  export const Info: React.FC<IconProps>;
  export const Users: React.FC<IconProps>;
  export const House: React.FC<IconProps>;
  export const Building2: React.FC<IconProps>;
  export const MapPinned: React.FC<IconProps>;
}
