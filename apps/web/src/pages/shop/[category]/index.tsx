import ProductList from "@components/shop/ProductList";
import { useRouter } from "next/router";
import React from "react";

export default function ProductsCategory() {
  const { category } = useRouter().query;

  return <ProductList filter={{category : category as string}} />;
}
