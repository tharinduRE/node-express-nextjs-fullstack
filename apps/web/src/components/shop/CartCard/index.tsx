/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Button,
  Card,
  CardMedia,
  IconButton,
  Typography
} from "@mui/material";
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
    <Card sx={{ display: "flex", marginY: 3 }} elevation={0}>
      <Box
        flexShrink={0}
        border={1}
        height={"6rem"}
        width={"6rem"}
        borderRadius={2}
        borderColor="#dadada"
        overflow="hidden"
      >
        <CardMedia
          component="img"
          src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg"
          alt="product-image"
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "space-between",
          // alignItems: "center",
          flexDirection: "column",
          marginLeft: 2,
        }}
      >
        <Box
          sx={{
           
            display: "flex",
            justifyContent: "space-between",
            // alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="body1">{product.product.name}</Typography>
          <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
            $ {product.product.listPrice}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="text-gray-500">
            Qty
            <IconButton
             onClick={() => dispatch(DECREMENT(product.product._id))}
            >
              <ArrowDropDownRounded fontSize="large" />
            </IconButton>
            {product.quantity}
            <IconButton
              onClick={() => dispatch(INCREMENT(product.product._id))}
            >
              <ArrowDropUpRounded fontSize="large" />
            </IconButton>
          </div>

          <div className="flex">
            <Button
              color="error"
              onClick={() => dispatch(REMOVE(product.product._id))}
            >
              Remove
            </Button>
          </div>
        </Box>
      </Box>
    </Card>
  );
}
