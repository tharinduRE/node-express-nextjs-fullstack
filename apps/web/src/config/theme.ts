import { PaletteMode, ThemeOptions } from "@mui/material";
import { deepPurple, indigo, purple } from "@mui/material/colors";
import { Plus_Jakarta_Sans } from "@next/font/google";

export const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

/**
 *  MUI Theme
 * @param mode
 * @returns
 */
const theme = (mode: PaletteMode): ThemeOptions => ({
  typography: (palatte) => ({
    fontFamily: font.style.fontFamily,
    fontSize: 12,
    fontWeightRegular: 500,
  }),
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: indigo[500],
          },
        }
      : {
          primary: deepPurple,
        }),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          boxShadow: "none",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            fontWeight: "bolder",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          ".MuiInputLabel-standard": {
            fontWeight: "semibold",
            textTransform: "uppercase",
            letterSpacing: 1,
          },
        },
      },
      defaultProps: {
        margin: "dense",
        variant: "standard",
        fullWidth: true,
        InputLabelProps: {
          shrink: true,
        },
      },
    },
  },
});

export default theme;
