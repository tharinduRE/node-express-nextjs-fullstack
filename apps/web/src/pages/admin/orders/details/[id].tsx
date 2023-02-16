import DashboardLayout from "@components/layout/Dashboard";
import OrderForm from "@components/order/OrderForm";
import { ArrowBackSharp } from "@mui/icons-material";
import {
  Alert, CircularProgress,
  Grid,
  IconButton,
  Typography
} from "@mui/material";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { getOrderById } from "../../../../lib/api/order";
import { RootState } from "../../../../store/store";

export default function OrderEdit() {
  const router = useRouter();
  const { id } = router.query;

  const selectedOrder = useSelector(
    (state: RootState) => state.order.selectedOrder
  );

  const { data: data, error } = useSWR(
    !selectedOrder && id ? `employe-${id}` : null,
    () => getOrderById(String(id)),
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <>
      <Grid container columns={2} sx={{ alignItems: "center" }}>
        <IconButton onClick={() => router.back()} sx={{marginRight:1}}>
          <ArrowBackSharp />
        </IconButton>
        <Typography variant='h6'>Order Details</Typography>
      </Grid>
      {!data && !selectedOrder ? (
        error ? (
          <Alert severity="error">No Matching Order Found</Alert>
        ) : (
          <CircularProgress />
        )
      ) : (
        <OrderForm order={selectedOrder || data?.data} />
      )}
    </>
  );
}


OrderEdit.getLayout = function getLayout(page:ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}