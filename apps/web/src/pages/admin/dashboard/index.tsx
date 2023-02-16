import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DashboardLayout from "@components/layout/Dashboard";
import { OrderChart } from "@components/dashboard/OrderChart";
import useSWR from "swr";
import {
  getDailyOrders,
  getOrderCountByStatus,
  getOrderList,
} from "../../../lib/api/order";
import StatCard from "@components/dashboard/StatCard";
import { getProductList } from "../../../lib/api/product";
import { getUserList } from "../../../lib/api/user";
import { OrderPieChart } from "@components/dashboard/OrderPieChart";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function AdminDashboard() {
  const { data: ordercountData } = useSWR("order-chart", getOrderCountByStatus);

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
        <Grid item xs={3}>
          <StatCard
            number={
              ordercountData?.data?.find((e) => e._id === "NEW")?.count || 0
            }
            title="New Orders"
          />
        </Grid>
        <Grid item xs={3}>
          <StatCard
            number={
              ordercountData?.data?.find((e) => e._id === "CANCELLED")?.count ||
              0
            }
            title="Cancelled Orders"
          />
        </Grid>
        <Grid item xs={3}>
          <StatCard
            number={productData?.data?.pagination?.count}
            title="Active Products"
          />
        </Grid>
        <Grid item xs={3}>
          <StatCard number={userData?.data?.pagination?.count} title="Users" />
        </Grid>
        <Grid item xs={3}>
          <Item>
            <OrderPieChart data={ordercountData?.data} />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <OrderChart data={dailyOrders?.data} />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

AdminDashboard.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
