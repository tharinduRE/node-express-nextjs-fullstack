/* eslint-disable @next/next/no-img-element */
import LoginButton from "@components/ui/LoginButton";
import { Home } from "@mui/icons-material";
import {
  Button,
  Container,
  Grid,
  MenuItem,
  MenuList,
  Paper,
  styled
} from "@mui/material";
import Box from "@mui/material/Box";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { navbarMenu } from "./navbarMenu";


const Header = styled("header")(({ theme }) => [
  {
    position: "fixed",
    width: "100%",
    top: 0,
    transition: theme.transitions.create("top"),
    zIndex: theme.zIndex.appBar,
    backdropFilter: "blur(8px)",
    boxShadow: `inset 0px -1px 1px ${theme.palette.grey[100]}`,
  },
]);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const activeMenuLink =
    router.pathname.split("/")[router.pathname.split("/").length - 1];
  const activeMenu = navbarMenu.find(
    (e) => e.children.findIndex((e) => e == activeMenuLink) !== -1
  );

  return (
    <>
      <Head>
        <title>Shopping App | Admin</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box sx={{ flexGrow: 1 }}>
        <Header className="bg-gray-900/90">
          <div className="px-6 lg:px-8">
            <nav
              className="flex items-center justify-between h-12"
              aria-label="Global"
            >
              <div className="flex lg:flex-1">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </Link>
              </div>
              <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
                <LoginButton />
              </div>
            </nav>
          </div>
        </Header>
      </Box>
      <Box
        paddingBottom={10}
        paddingTop={3}
        component="main"
        marginTop={3}
        minHeight="100vh"
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              paddingY: 0.5,
              paddingX: 2,
              borderBottom: 1,
              borderColor: "#f1f1f1",
            }}
            // className="bg-indigo-900/20"
          >
            <Box
              alignItems="center"
              display="flex"
              justifyContent="space-between"
            >
              <div>
                {navbarMenu.map((item, i) => (
                  <Link href={`${item.link}/${item.children[0]}`} key={i}>
                    <Button
                      size="small"
                      className="mr-2"
                      startIcon={item.icon}
                      variant={
                        activeMenuLink == item.link ? "outlined" : "text"
                      }
                    >
                      {item?.name}
                    </Button>
                  </Link>
                ))}
              </div>
              <Link href={`/`}>
                <Button size="small" startIcon={<Home/>}>Home</Button>
              </Link>
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            borderRight={1}
            borderColor="#f1f1f1"
            justifyContent="space-between"
            sx={{ position: "sticky", left: 0, top: 0 }}
          >
            <Grid item xs={12}>
              <Paper
                sx={{ width: 320, maxWidth: "100%", height: "100%" }}
                elevation={0}
              >
                <MenuList id="basic-menu">
                  {activeMenu?.children.map((item, i) => (
                    <Link href={`${activeMenu.link}/${item}`} key={i}>
                      <MenuItem
                        selected={
                          router.pathname == `${activeMenu.link}/${item}`
                        }
                        className="capitalize"
                      >
                        {item}
                      </MenuItem>
                    </Link>
                  ))}
                </MenuList>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={10} paddingX={2} paddingTop={1}>
            <Container maxWidth="xl" disableGutters sx={{ minHeight: "100vh" }}>
              {children}
            </Container>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
