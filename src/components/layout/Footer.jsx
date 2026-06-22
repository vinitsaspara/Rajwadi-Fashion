import Container from "./Container";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 mt-16">
      <Container>
        <div className="text-center">
          <h3 className="text-xl font-semibold">
            Rajwadi Fashion
          </h3>

          <p className="mt-2">
            Premium Kurtis & Chaniya Choli
            Collection
          </p>

          <p className="mt-4 text-sm">
            © 2026 Rajwadi Fashion.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;