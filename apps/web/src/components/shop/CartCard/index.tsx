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
import { useSnackbar } from "notistack";
import { getDummyImage } from "@components/product/helpers";

export function CartProductCard({
  cartItem,
}: {
  cartItem: { product: Product; quantity: number };
}) {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleRemoveFromCart = () => { 
    enqueueSnackbar('Removed from Cart',{variant : 'success'})
    dispatch(REMOVE(cartItem.product._id))
   }
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
          src={getDummyImage(cartItem.product)}
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
          <Typography variant="body1">{cartItem.product.name}</Typography>
          <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
            $ {cartItem.product.listPrice}
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
             onClick={() => dispatch(DECREMENT(cartItem.product._id))}
            >
              <ArrowDropDownRounded fontSize="large" />
            </IconButton>
            {cartItem.quantity}
            <IconButton
              onClick={() => dispatch(INCREMENT(cartItem.product._id))}
            >
              <ArrowDropUpRounded fontSize="large" />
            </IconButton>
          </div>

          <div className="flex">
            <Button
              color="error"
              onClick={handleRemoveFromCart}
            >
              Remove
            </Button>
          </div>
        </Box>
      </Box>
    </Card>
  );
}
