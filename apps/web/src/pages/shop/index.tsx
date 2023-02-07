import ProductList from "@components/shop/ProductList";
import { useRouter } from "next/router";

export default function ProductPage() {
  const { q } = useRouter().query;

  return <ProductList query={q as string} />;
}
