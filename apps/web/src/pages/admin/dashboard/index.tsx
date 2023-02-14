import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DashboardLayout from "@components/layout/DashboardLayout";
import { OrderChart } from "@components/dashboard/OrderChart";
import useSWR from "swr";
import { getDailyOrders, getOrderList } from "../../../lib/api/order";
import StatCard from "@components/dashboard/StatCard";
import { getProductList } from "../../../lib/api/product";
import { getUserList } from "../../../lib/api/user";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function AdminDashboard() {
  const { data: orderData } = useSWR("order-chart", () =>
    getOrderList({
      pagination: { page: 0, pageSize: 10 },
      filters: { status: "NEW" },
    })
  );

  const { data: dailyOrders } = useSWR("dailyorder-chart", getDailyOrders);

  const { data: productData } = useSWR("product-chart", () =>
    getProductList({
      pagination: { page: 0, pageSize: 10 },
      filters: { active: true },
    })
  );

  const { data: userData } = useSWR("user-chart", () =>
    getUserList({ pagination: { page: 0, pageSize: 10 } })
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <StatCard
            number={orderData?.data?.pagination?.count}
            title="New Orders"
          />
        </Grid>
        <Grid item xs={4}>
          <StatCard
            number={productData?.data?.pagination?.count}
            title="Active Products"
          />
        </Grid>
        <Grid item xs={4}>
          <StatCard number={userData?.data?.pagination?.count} title="Users" />
        </Grid>
        <Grid item xs={6}>
          <Item>
            <OrderChart data={dailyOrders?.data} />
          </Item>
        </Grid>
        <Grid item xs={4}>
          {/* <Item>xs=4</Item> */}
        </Grid>
      </Grid>
    </Box>
  );
}

AdminDashboard.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
