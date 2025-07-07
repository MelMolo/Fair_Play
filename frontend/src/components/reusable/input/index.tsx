/* eslint-disable  @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";
import clsx from "clsx";

type InputType =
  | "text"
  | "password"
  | "number"
  | "select"
  | "toggle"
  | "textarea";

type IconPosition = "left" | "right";

interface InputFieldProps {
  type?: InputType;
  label?: string;
  labelPosition?: "top" | "left";
  placeholder?: string;
  options?: string[]; // only for select
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  value?: string | number | boolean;
  onChange?: (val: any) => void;
  error?: boolean;
  errorMessage?: string;
  name?: string;
  required?: boolean;
  labelClass?: string;
}

export default function InputField({
  type = "text",
  label,
  labelPosition = "top",
  placeholder,
  options = [],
  icon,
  iconPosition = "left",
  value,
  onChange,
  error,
  errorMessage,
  name,
  required = false,
  labelClass = " ",
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [toggleValue, setToggleValue] = useState(value === true);

  const inputBaseStyles =
    "w-full px-4 py-2 rounded-md border transition-all duration-200 focus:outline-none focus:ring-2";
  const errorStyles = error
    ? "border-red-500 focus:ring-red-400"
    : "border-gray-300 focus:ring-blue-400";

  const commonProps = {
    name,
    className: clsx(inputBaseStyles, errorStyles),
    placeholder,
    required,
  };

  const renderInput = () => {
    switch (type) {
      case "password":
        return (
          <div className="relative w-full">
            <input
              {...commonProps}
              type={showPassword ? "text" : "password"}
              value={value as string}
              onChange={(e) => onChange?.(e.target.value)}
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </span>
          </div>
        );
      case "select":
        return (
          <select
            {...commonProps}
            value={value as string}
            onChange={(e) => onChange?.(e.target.value)}
          >
            <option value="">-- Select --</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      case "toggle":
        return (
          <div
            className={`flex ${
              !toggleValue
                ? "justify-start bg-gray-300"
                : "justify-end bg-blue-100"
            } relative  w-12 h-6  rounded-full cursor-pointer transition-all`}
            onClick={() => {
              setToggleValue((prev) => !prev);
              onChange?.(!toggleValue);
            }}
          >
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={clsx(
                "w-6 h-6 rounded-full shadow-md",
                !toggleValue ? "bg-white" : "bg-blue-500"
              )}
            />
          </div>
        );
      case "textarea":
        return (
          <textarea
            {...commonProps}
            value={value as string}
            onChange={(e) => onChange?.(e.target.value)}
            rows={4}
            className={clsx(commonProps.className, "resize-none")}
          />
        );
      default:
        return (
          <div className="relative w-full">
            {icon && iconPosition === "left" && (
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {icon}
              </span>
            )}
            <input
              {...commonProps}
              type={type}
              value={value as string | number}
              onChange={(e) => onChange?.(e.target.value)}
              className={clsx(
                commonProps.className,
                icon ? (iconPosition === "left" ? "pl-10" : "pr-10") : ""
              )}
            />
            {icon && iconPosition === "right" && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                {icon}
              </span>
            )}
          </div>
        );
    }
  };

  return (
    <div className="space-y-1 w-full">
      {label && labelPosition === "top" && (
        <label
          htmlFor={name}
          className={`${labelClass} block font-medium text-sm text-gray-700`}
        >
          {label}
        </label>
      )}

      <div className="flex items-center gap-2">
        {label && labelPosition === "left" && (
          <label
            htmlFor={name}
            className={`${labelClass} font-medium text-sm text-gray-700 min-w-[80px]`}
          >
            {label}
          </label>
        )}
        <div className="flex-1">{renderInput()}</div>
      </div>

      <AnimatePresence>
        {error && errorMessage && (
          <motion.span
            className="text-red-500 text-xs"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          >
            {errorMessage}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
