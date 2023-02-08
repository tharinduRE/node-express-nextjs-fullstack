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

import SessionLoader from "@components/common/SessionLoader";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  Filler,
} from "chart.js";
import { SessionProvider } from "next-auth/react";
import { PersistGate } from "redux-persist/integration/react";
import apptheme from "../config/theme";
import store, { persistor } from "../store/store";
import "../styles/global.css";
import { SWRConfig } from "swr";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

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

  const swrConfig: typeof SWRConfig.defaultProps = {
    value: {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnMount: true,
    },
  };
  const theme = useMemo(() => createTheme(apptheme(mode)), [mode]);
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <ErrorBoundary>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SWRConfig {...swrConfig}>
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
            </SWRConfig>
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </>
  );
}
