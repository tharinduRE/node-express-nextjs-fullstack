import { AppBarTop, Footer } from "../common";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Head from "next/head";
import CookieConsent from "@components/ui/CookieConsent";
import SiteHead from "@components/common/Head";

export default function PrimaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>Shopping App</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <SiteHead/>
      </Head>
      <Box sx={{ flexGrow: 1 }}>
        <AppBarTop />
      </Box>
      <Box
        paddingBottom={10}
        component="main"
        marginTop={8}
        minHeight="100vh"
      >
        <Container>{children}</Container>
      </Box>
      <Footer />
      <CookieConsent/>
    </>
  );
}
