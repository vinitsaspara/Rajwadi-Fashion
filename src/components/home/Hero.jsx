import Container from "../shared/Container";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-20 bg-gray-100">
      <Container>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-orange-600 font-semibold">
              Rajwadi Fashion
            </span>

            <h1 className="text-5xl font-bold mt-4 mb-6">
              Premium Traditional &
              Modern Fashion Collection
            </h1>

            <p className="text-gray-600 mb-8">
              Discover exclusive ethnic wear,
              wedding collections, and trendy
              fashion designed for every occasion.
            </p>

            <div className="flex gap-4">
              <Link
                href="/products"
                className="px-6 py-3 bg-black text-white rounded-lg"
              >
                Shop Now
              </Link>

              <Link
                href="/products"
                className="px-6 py-3 border rounded-lg"
              >
                Explore Collection
              </Link>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b"
              alt="Fashion"
              className="rounded-xl w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}