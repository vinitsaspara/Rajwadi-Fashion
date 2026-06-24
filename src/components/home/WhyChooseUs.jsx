import Container from "../shared/Container";
import {
  Truck,
  ShieldCheck,
  RefreshCcw,
  Star,
} from "lucide-react";

const features = [
  {
    title: "Free Shipping",
    icon: Truck,
  },
  {
    title: "Secure Payment",
    icon: ShieldCheck,
  },
  {
    title: "Easy Returns",
    icon: RefreshCcw,
  },
  {
    title: "Premium Quality",
    icon: Star,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="border rounded-lg p-6 text-center"
              >
                <Icon
                  size={40}
                  className="mx-auto mb-4"
                />

                <h3 className="font-semibold">
                  {item.title}
                </h3>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}