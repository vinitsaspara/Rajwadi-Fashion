import Container from "@/components/layout/Container";

const Section = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <section className="py-16">
      <Container>
        {(title || subtitle) && (
          <div className="text-center mb-10">
            {title && (
              <h2 className="text-3xl font-bold">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="text-gray-500 mt-2">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {children}
      </Container>
    </section>
  );
};

export default Section;