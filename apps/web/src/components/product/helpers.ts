import { Product } from "../../types/product";

export function getDummyImage(product: Product) {
  return `https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-0${
    Number(product.itemId) % 9 || 9
  }.jpg`;
}

export const getProductImageList = (product?: Product) => {
  let n =( Number(product?.itemId) % 9 || 1);
  return Array.from(Array(10).keys())
    .map(
      (e) =>
        `https://tailwindui.com/img/ecommerce-images/category-page-0${e + 1}-image-card-0${n}.jpg`
    )
    .map((img, idx) => ({ src: img, alt: `prod-img-${idx}` }));
};
