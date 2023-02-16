/* eslint-disable @next/next/no-img-element */
import { Button } from "@mui/material";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { useAppDispatch } from "../../../store/hooks";
import { ADD } from "../../../store/slices/cart";
import { Product } from "../../../types/product";
import { getDummyImage } from "../helpers";

export function ProductCard({ product }: { product: Product }): JSX.Element {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const productImage = getDummyImage(product);

  const handleAddToCart = () => {
    enqueueSnackbar('Added to Cart',{key : product._id,variant : 'success'})
    dispatch(ADD(product));
  };
  return (
    <div>
      <Link
        key={product._id}
        href={`/shop/${product.category.toLowerCase()}/${product.slug}`}
        className="group"
      >
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
          <img
            src={productImage}
            alt="product-image"
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
      </Link>
      <div className="mt-4 text-sm text-gray-700 font-bold">{product.name}</div>
      <div className="my-2 text-base font-medium text-gray-900">
        $ {product.listPrice}
      </div>
      <Button
        fullWidth
        variant="contained"
        // sx={{ backgroundColor: "gray" }}
        onClick={handleAddToCart}
      >
        Add To Bag
      </Button>
    </div>
  );
}