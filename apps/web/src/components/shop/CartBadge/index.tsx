/* eslint-disable @next/next/no-img-element */
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { ArrowBack, ShoppingBag } from "@mui/icons-material";
import {
  Badge,
  BadgeProps,
  Box,
  Button, Drawer,
  Grid,
  IconButton,
  styled,
  Typography
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import ShoppingCart from "../ShoppingCart";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 24,
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
  const totalItemCount = cart?.items?.reduce((a, b) => a + b.quantity, 0);

  return (
    <>
      <StyledBadge badgeContent={totalItemCount} color="secondary">
        <IconButton className="mr-4" onClick={handleClickOpen}>
          <ShoppingBag/>
        </IconButton>
      </StyledBadge>
      <Drawer
        open={open}
        anchor="right"
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        // hideBackdrop
      >
        <Box padding={3}>
          <IconButton onClick={handleClose} sx={{marginBottom:1}}><ArrowBack/></IconButton>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Bag
          </Typography>
          <Grid position="relative">
            <Grid>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <p>Subtotal</p>
                <p>$ {cartTotal.toFixed(2)}</p>
              </Box>

              <div className="mt-6">
                <Link href="/shop/bag" onClick={handleClose}>
                  <Button variant="contained" fullWidth disabled={cart.items.length == 0}>
                    Checkout
                  </Button>
                </Link>
                <Button fullWidth sx={{ marginTop: 2 }} onClick={handleClose}>
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Button>
              </div>
            </Grid>
            <ShoppingCart />
          </Grid>
        </Box>
      </Drawer>
    </>
  );
}
