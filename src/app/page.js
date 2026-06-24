import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import NewArrivals from "@/components/home/NewArrivals";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Newsletter from "@/components/home/Newsletter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
    <Navbar/>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <NewArrivals />
      <WhyChooseUs />
      <Newsletter />
      <Footer/>
    </>
  );
}