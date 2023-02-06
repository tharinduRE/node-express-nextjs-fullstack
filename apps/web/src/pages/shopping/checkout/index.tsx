import ShoppingCart from "@components/shop/ShoppingCart";
import { Button, Grid, Paper } from "@mui/material";
import { addOne } from "../../../lib/api/order";
import { useAppSelector } from "../../../store/hooks";

export default function CheckoutPage() {
  const cart = useAppSelector((state) => state.cart);
  const cartTotal = cart?.items?.reduce(
    (acc, item) => acc + item.product.listPrice * item.quantity,
    0
  );

  const confirmOrder = async() => {
    try{
      const res = await addOne({
        items : cart.items,
        amount : cartTotal
      })

    }catch (e) {
      console.error(e)
    }
  }

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={5}>
        <Paper sx={{ padding: 2 }}>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>$ {cartTotal.toFixed(2)}</p>
          </div>
          <Button variant="contained" fullWidth size="large" onClick={confirmOrder}>
            Confirm
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}
