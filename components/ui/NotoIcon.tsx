"use client";

import { Icon, IconProps } from "@iconify/react";

interface NotoIconProps extends Omit<IconProps, "icon"> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  size?: number | string;
  className?: string;
}

export function NotoIcon({ icon, size = 24, className = "", ...props }: NotoIconProps) {
  return (
    <Icon
      icon={icon}
      width={size}
      height={size}
      className={`inline-block flex-shrink-0 select-none ${className}`}
      {...props}
    />
  );
}
