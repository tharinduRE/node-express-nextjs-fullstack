import { AppBarTop, Footer } from "../common";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";

export default function PrimaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBarTop />
      </Box>
      <Box paddingBottom={10} paddingTop={5} component="main" marginTop={8} minHeight='100vh'>
        <Container>{children}</Container>
      </Box>
      <Footer />
    </>
  );
}
