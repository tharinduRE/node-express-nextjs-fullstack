import { DashboardRounded } from "@mui/icons-material";

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
    children: ["users"],
  },
];
