const Badge = ({
  children,
  className = "",
}) => {
  return (
    <span
      className={`
        inline-flex
        items-center
        px-2 py-1
        rounded-full
        text-xs
        font-medium
        bg-red-100
        text-red-600
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;