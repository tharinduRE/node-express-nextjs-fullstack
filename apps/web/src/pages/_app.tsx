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
import store, { persistor } from "../store/store";
import "../styles/global.css";
import { SessionProvider } from "next-auth/react";
import { PersistGate } from "redux-persist/integration/react";
import SessionLoader from "@components/common/SessionLoader";

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
          <PersistGate loading={null} persistor={persistor}>
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                <SessionProvider session={session}>
                  <SessionLoader>
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
                  </SessionLoader>
                </SessionProvider>
              </ThemeProvider>
            </ColorModeContext.Provider>
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </>
  );
}
