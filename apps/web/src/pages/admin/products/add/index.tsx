import DashboardLayout from "@components/layout/Dashboard";
import ProductForm from "@components/product/ProductForm";
import ArrowBackSharp from "@mui/icons-material/ArrowBackSharp";
import { Grid, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { ReactElement } from "react";

export default function EmployeeAdd() {
  const router = useRouter();
  return (
    <>
      <Grid container columns={2} sx={{ alignItems: "center" }}>
        <IconButton onClick={() => router.back()} sx={{marginRight:1}}>
          <ArrowBackSharp />
        </IconButton>
        <Typography variant='h6'>Add New Product</Typography>
      </Grid>
      <ProductForm />
    </>
  );
}

EmployeeAdd.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
