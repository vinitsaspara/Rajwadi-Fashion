import Container from "../shared/Container";
import ProductCard from "@/components/product/ProductCard";

const arrivals = [
  {
    id: 4,
    name: "Designer Kurta",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
  },
  {
    id: 5,
    name: "Festival Wear",
    price: 3499,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
  },
  {
    id: 6,
    name: "Ethnic Collection",
    price: 3999,
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
  },
];

export default function NewArrivals() {
  return (
    <section className="py-16">
      <Container>
        <h2 className="text-3xl font-bold mb-8">
          New Arrivals
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {arrivals.map((product) => (
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