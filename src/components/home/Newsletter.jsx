import Container from "../shared/Container";

export default function Newsletter() {
  return (
    <section className="py-20">
      <Container>
        <div className="bg-black text-white rounded-2xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Subscribe To Our Newsletter
          </h2>

          <p className="mb-6 text-gray-300">
            Get updates about new arrivals,
            offers, and fashion trends.
          </p>

          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-black"
            />

            <button className="bg-orange-500 px-6 rounded-lg">
              Subscribe
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}