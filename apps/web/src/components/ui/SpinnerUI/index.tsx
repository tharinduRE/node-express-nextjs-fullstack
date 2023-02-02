import { Box, CircularProgress } from "@mui/material";

export function SpinnerUI() {
  return <Box
    sx={{ display: "flex", padding: 2, justifyContent: "center" }}
  >
    <CircularProgress size={32} />
  </Box>;
}
