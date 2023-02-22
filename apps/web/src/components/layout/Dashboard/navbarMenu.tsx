import DashboardRounded from "@mui/icons-material/DashboardRounded";

export const navbarMenu = [
  {
    name: "Dashboard",
    icon: <DashboardRounded />,
    link: "/admin",
    children: ["dashboard", "products", "orders"],
  },
  {
    name: "Administration",
    link: "/admin/administration",
    children: ["users",'metadata'],
  },
];
