import ErrorBoundary from "@components/common/ErrorBoundary";
import { Layout } from "@components/layout";
import { ColorModeContext } from "@components/ui/ThemeSwitch";
import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from "@mui/material";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import { ReactElement, ReactNode, useMemo, useState } from "react";
import { Provider } from "react-redux";

import apptheme from "../config/theme";
import store from "../store";
import "../styles/global.css";
import { SessionProvider } from "next-auth/react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const [mode, setMode] = useState<PaletteMode>("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(apptheme(mode)), [mode]);
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <ErrorBoundary>
        <Provider store={store}>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <SessionProvider session={session}>
                <SnackbarProvider maxSnack={3}>
                  <CssBaseline />
                  {Component.getLayout ? (
                    getLayout(<Component {...pageProps} />)
                  ) : (
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  )}
                </SnackbarProvider>
              </SessionProvider>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </Provider>
      </ErrorBoundary>
    </>
  );
}
