/* eslint-disable @next/next/no-img-element */
import { Button, IconButton, Typography } from "@mui/material";
import { useAppDispatch } from "../../../store/hooks";
import { DECREMENT, INCREMENT, REMOVE } from "../../../store/slices/cart";
import { Product } from "../../../types/product";

import { ArrowDropDownRounded, ArrowDropUpRounded } from "@mui/icons-material";

export function CartProductCard({
  product,
}: {
  product: { product: Product; quantity: number };
}) {
  const dispatch = useAppDispatch();
  return (
    <li key={product.product._id} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg"
          alt="product-image"
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-xs font-medium text-gray-900">
            <Typography variant="body1">{product.product.name}</Typography>
            <p className="ml-4">$ {product.product.listPrice}</p>
          </div>
          {/* <p className="mt-1 text-sm text-gray-500">
            {product.color}
          </p> */}
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="text-gray-500">
            Qty
            <IconButton
              onClick={() => {
                dispatch({ type: DECREMENT, payload: product.product });
              }}
            >
              <ArrowDropDownRounded fontSize="large" />
            </IconButton>
            {product.quantity}
            <IconButton
              onClick={() => {
                dispatch({ type: INCREMENT, payload: product.product });
              }}
            >
              <ArrowDropUpRounded fontSize="large" />
            </IconButton>
          </div>

          <div className="flex">
            <Button
              color="error"
              onClick={() => {
                dispatch({ type: REMOVE, payload: product.product });
              }}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
}
