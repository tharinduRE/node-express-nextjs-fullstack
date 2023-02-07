import ShoppingCart from "@components/shop/ShoppingCart";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { useAppSelector } from "../../../store/hooks";

export default function CheckoutPage() {
  const cart = useAppSelector((state) => state.cart);
  const cartTotal = cart?.items?.reduce(
    (acc, item) => acc + item.product.listPrice * item.quantity,
    0
  );

  return (
    <Grid container spacing={2} justifyContent="space-between">
      <Grid item lg={5} xs={12}>
        <ShoppingCart />
      </Grid>
      <Grid item lg={4} xs={12} sx={{ position: "relative" }}>
        <Paper sx={{ padding: 2, position: "sticky", top: 72 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection:'column',
              alignItems: "center",
              marginBottom: 4,
            }}
          >
            <Typography variant="h5">
              Your Bag Total is{" "}
              <span className="ml-2">
                <b>$ {cartTotal.toFixed(2)}</b>
              </span>
            </Typography>
            <Typography variant='body1' sx={{marginTop:2}}>
              Get free shipping on all orders.
            </Typography>
          </Box>

          <Link href="checkout">
            <Button variant="contained" fullWidth>
              Checkout
            </Button>
          </Link>
        </Paper>
      </Grid>
    </Grid>
  );
}
