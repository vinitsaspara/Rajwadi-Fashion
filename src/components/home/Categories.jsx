import Container from "../shared/Container";

const categories = [
  "Men",
  "Women",
  "Kids",
  "Accessories",
  "Wedding Wear",
  "Traditional Wear",
];

export default function Categories() {
  return (
    <section className="py-16">
      <Container>
        <h2 className="text-3xl font-bold mb-8 text-center">
          Shop By Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {categories.map((category) => (
            <div
              key={category}
              className="border rounded-lg p-6 text-center hover:shadow-md cursor-pointer"
            >
              <h3 className="font-medium">
                {category}
              </h3>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}