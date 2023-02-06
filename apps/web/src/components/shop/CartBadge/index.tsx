/* eslint-disable @next/next/no-img-element */
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import {
  Badge,
  BadgeProps,
  Box,
  Button,
  Container,
  Drawer,
  Grid,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Link from "next/link";
import { useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import ShoppingCart from "../ShoppingCart";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 20,
    top: 8,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export function CartBadge() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cart = useAppSelector((state) => state.cart);
  const cartTotal = cart?.items?.reduce(
    (acc, item) => acc + item.product.listPrice * item.quantity,
    0
  );
  const totalItemCount = cart?.items?.reduce((a,b)=>(a + b.quantity),0);

  return (
    <>
      <StyledBadge badgeContent={totalItemCount} color="secondary">
        <IconButton className="mr-4" onClick={handleClickOpen}>
          <ShoppingCartIcon className="w-6" />
        </IconButton>
      </StyledBadge>
      <Drawer
        open={open}
        anchor="right"
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        // hideBackdrop
      >
        <Box width={400} padding={3}>
          <Typography variant="h6">Shopping Cart</Typography>
          <Grid position='relative'>
            <Grid>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>$ {cartTotal.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <Link href="/shopping/checkout" onClick={handleClose}>
                  <Button variant="contained" fullWidth>
                    Checkout
                  </Button>
                </Link>
                <Button fullWidth sx={{ marginTop: 2 }} onClick={handleClose}>
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Button>
              </div>
            </Grid>
            <Grid container>
              <Grid item>
                <ShoppingCart />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </>
  );
}
