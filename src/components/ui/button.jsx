import React from "react";

const variants = {
  primary:
    "bg-black text-white hover:bg-neutral-800",
  secondary:
    "border border-black text-black hover:bg-gray-100",
  danger:
    "bg-red-500 text-white hover:bg-red-600",
};

const Button = ({
  children,
  type = "button",
  variant = "primary",
  className = "",
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        px-4 py-2
        rounded-md
        transition
        cursor-pointer
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;