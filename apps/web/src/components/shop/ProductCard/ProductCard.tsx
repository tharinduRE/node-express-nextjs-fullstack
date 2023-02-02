/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Product } from "../../../types/product";

export function ProductCard({ product }: { product: Product; }): JSX.Element {
  return <Link key={product._id} href={`products/${product.category}/${product.itemId}`} className="group">
    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
      <img
        src='https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg'
        alt="product-image"
        className="h-full w-full object-cover object-center group-hover:opacity-75"
         />
    </div>
    <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
    <p className="mt-1 text-lg font-medium text-gray-900">{product.listPrice}</p>
    {/* <Button> Add To Cart</Button> */}
  </Link>;
}
