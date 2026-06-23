import Button from "../ui/button";
import Container from "../layout/Container";

const HeroSection = () => {
  return (
    <section className="bg-neutral-100">
      <Container>
        <div
          className="
            min-h-[600px]
            flex
            items-center
          "
        >
          <div className="max-w-2xl">
            <span className="text-sm uppercase tracking-widest">
              New Collection
            </span>

            <h1
              className="
                text-5xl
                md:text-7xl
                font-bold
                mt-4
              "
            >
              Traditional Elegance
              For Every Occasion
            </h1>

            <p
              className="
                mt-6
                text-gray-600
                text-lg
              "
            >
              Discover premium Kurtis,
              Chaniya Choli, Sarees and
              Lehengas crafted for modern
              women.
            </p>

            <Button className="mt-8">
              Shop Now
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;