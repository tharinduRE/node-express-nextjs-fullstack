import { Button, Grid, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { addOne } from "../../../lib/api/order";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { CLEAR } from "../../../store/slices/cart";

export default function CheckoutPage() {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const router= useRouter()

  const cartTotal = cart?.items?.reduce(
    (acc, item) => acc + item.product.listPrice * item.quantity,
    0
  );

  const confirmOrder = async () => {
    try {
      const res = await addOne({
        items: cart.items,
        amount: cartTotal,
      });
      if (res.status == 201) {
        dispatch(CLEAR());
        router.replace({pathname : `/shop/order/completed`,query : {ref : res?.data?.orderNo}})
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} lg={6}>
        <Paper sx={{ padding: 2 }}>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Payment Method</p>
            <p>COD</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>$ {cartTotal.toFixed(2)}</p>
          </div>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={confirmOrder}
          >
            Confirm &amp; Pay
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}
