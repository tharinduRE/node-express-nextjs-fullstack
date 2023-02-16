import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import * as React from "react";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export default function ThemeSwitch() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const switchTheme = () => {
    colorMode.toggleColorMode();
  };
  return (
    <IconButton sx={{ ml: 1 }} onClick={switchTheme} color="inherit">
      {theme.palette.mode === "dark" ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
}
