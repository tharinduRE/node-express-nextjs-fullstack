import ShoppingCart from "@components/shop/ShoppingCart";
import { Button, Grid, Paper } from "@mui/material";
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
      <Grid item xs={5}>
        <ShoppingCart />
      </Grid>
      <Grid item xs={4}>
        <Paper sx={{ padding: 2 }}>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>$ {cartTotal.toFixed(2)}</p>
          </div>
          <Link href='payment'>
          <Button variant="contained" fullWidth>
            Proceed to Payment
          </Button>
          </Link>
        </Paper>
      </Grid>
    </Grid>
  );
}
