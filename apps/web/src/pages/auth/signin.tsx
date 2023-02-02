import { GitHub } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "black" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" fontWeight="bolder">
          Sign in
        </Typography>

        <Box marginTop={4} width="100%">
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1, backgroundColor: "black" }}
            startIcon={<GitHub />}
            onClick={() => signIn("github", { callbackUrl: "/" })}
          >
            Sign In with Github
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

SignIn.getLayout = function getLayout(page: React.ReactElement) {
  return <>{page}</>;
};
