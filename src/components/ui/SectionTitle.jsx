const SectionTitle = ({
  title,
  subtitle,
}) => {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold">
        {title}
      </h2>

      {subtitle && (
        <p className="text-gray-500 mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;