import { EmployeeForm } from "@components/employee";
import DashboardLayout from "@components/layout/DashboardLayout";
import { ArrowBackSharp } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import Link from "next/link";
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
      <EmployeeForm />
    </>
  );
}

EmployeeAdd.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
