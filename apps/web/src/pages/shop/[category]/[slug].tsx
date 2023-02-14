/* eslint-disable @next/next/no-img-element */
import { Breadcrumbs, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getProductBySlug } from "../../../lib/api/product";
import { useAppDispatch } from "../../../store";
import { ADD } from "../../../store/slices/cart";


const images = [
  {
    src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
    alt: "Two each of gray, white, and black shirts laying flat.",
  },
  {
    src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
    alt: "Model wearing plain black basic tee.",
  },
  {
    src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
    alt: "Model wearing plain gray basic tee.",
  },
  {
    src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
    alt: "Model wearing plain white basic tee.",
  },
];

export default function Example() {
  const { category, slug } = useRouter().query;

  const { data: data, error } = useSWR(`products-${slug}`, () =>
    getProductBySlug(slug as string)
  );

  const product = data?.data;

  const dispatch = useAppDispatch();

  return (
    <div className="bg-white">
      <div className="pt-6">
        <Breadcrumbs
          aria-label="breadcrumb"
          className="px-8 pt-4"
          sx={{ fontSize: "small" }}
        >
          <Link href="/shop">shop</Link>
          <Link href={`/shop/${category}`}>
            {category}
          </Link>
          <Link
            color="text.primary"
            href={`/shop/${category}/${product?.slug}`}
            aria-current="page"
          >
            {product?.slug}
          </Link>
        </Breadcrumbs>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={images[0].src}
              alt={images[0].alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
              <img
                src={images[1].src}
                alt={images[1].alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
              <img
                src={images[2].src}
                alt={images[2].alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
            <img
              src={images[3].src}
              alt={images[3].alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product?.name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              $ {product?.listPrice}
            </p>
            <Button
              size="large"
              fullWidth
              variant="contained"
              onClick={() => {
                if (product) dispatch(ADD(product));
              }}
            >
              Add to Bag
            </Button>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-3">
                <p className="text-base text-gray-900">
                  {product?.description}
                </p>
              </div>
            </div>

            {/* <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
