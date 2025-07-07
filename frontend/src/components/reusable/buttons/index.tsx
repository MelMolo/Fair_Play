"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost";
type IconPosition = "left" | "right";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  ghost:
    "bg-transparent text-gray-800 hover:bg-gray-100 border border-gray-300",
};

export default function Button({
  variant = "primary",
  icon,
  iconPosition = "left",
  children,
  className,
  ...rest
}: CustomButtonProps) {
  return (
    <button {...rest}>
      <motion.span
        whileTap={{ opacity: 0.9 }}
        className={clsx(
          "inline-flex items-center active:border-none font-poppins cursor-pointer gap-2 rounded-xl px-4 py-2 font-medium transition-all duration-200 ",
          variantClasses[variant],
          className
        )}
      >
        {icon && iconPosition === "left" && <span>{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === "right" && <span>{icon}</span>}
      </motion.span>
    </button>
  );
}
