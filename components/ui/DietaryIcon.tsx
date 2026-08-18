import React from "react";

type DietaryIconProps = {
  vegetarian: boolean;
  size?: number;
  className?: string;
};

export function DietaryIcon({
  vegetarian,
  size = 20,
  className = "",
}: DietaryIconProps) {
  const color = vegetarian ? "#008000" : "#8B4513";

  return (
    <span
      className={`rounded-xs bg-white dark:bg-[#2b1b17] shadow-xs flex-shrink-0 ${className}`}
      aria-label={vegetarian ? "Vegetarian / Eggless" : "Contains Egg / Non-vegetarian"}
      title={vegetarian ? "100% Vegetarian (Eggless)" : "Contains Egg (Non-veg)"}
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        border: `2px solid ${color}`,
        boxSizing: "border-box",
      }}
    >
      <span
        style={{
          width: size * 0.45,
          height: size * 0.45,
          borderRadius: vegetarian ? "50%" : "0%",
          backgroundColor: color,
          transform: vegetarian ? undefined : "rotate(45deg)",
        }}
      />
    </span>
  );
}
