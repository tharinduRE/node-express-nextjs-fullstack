import { Product } from "../../types/product";

export function getDummyImage(product: Product) {
  return `https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-0${Number(product.itemId) % 9 || 9}.jpg`;
}
