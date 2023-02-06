import DashboardLayout from "@components/layout/DashboardLayout";
import { ProductForm } from "@components/product";
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
import { getProductById } from "../../../../lib/api/product";
import { RootState } from "../../../../store/store";

export default function ProductEdit() {
  const router = useRouter();
  const { id } = router.query;

  const selectedProduct = useSelector(
    (state: RootState) => state.product.selectedProduct
  );

  const { data: data, error } = useSWR(
    !selectedProduct && id ? `employe-${id}` : null,
    () => getProductById(String(id)),
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
        <Typography variant='h6'>Edit Product</Typography>
      </Grid>
      {!data && !selectedProduct ? (
        error ? (
          <Alert severity="error">No Matching Product Found</Alert>
        ) : (
          <CircularProgress />
        )
      ) : (
        <ProductForm product={selectedProduct || data?.data} />
      )}
    </>
  );
}


ProductEdit.getLayout = function getLayout(page:ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}