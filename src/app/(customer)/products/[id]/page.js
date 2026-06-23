import ProductDetails from "@/components/product/ProductDetails";

export default async function ProductPage({
  params,
}) {
  const { id } = await params;

  return <ProductDetails id={id} />;
}