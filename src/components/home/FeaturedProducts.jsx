import Container from "../shared/Container";
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Wedding Kurta",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
  },
  {
    id: 2,
    name: "Sherwani",
    price: 4999,
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518",
  },
  {
    id: 3,
    name: "Traditional Suit",
    price: 2999,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <h2 className="text-3xl font-bold mb-8">
          Featured Products
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}