const Input = ({
  label,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-sm font-medium">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`
          w-full
          border
          rounded-md
          px-4
          py-2
          outline-none
          focus:ring-2
          focus:ring-black
          ${className}
        `}
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;