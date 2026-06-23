import React from "react";

const variants = {
  primary:
    "bg-brand text-white hover:bg-brand-dark transition-colors duration-200",
  secondary:
    "border-2 border-stone-300 text-black hover:border-brand hover:bg-orange-50 transition-colors duration-200",
  danger:
    "bg-red-500 text-white hover:bg-red-600 transition-colors duration-200",
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