import { Provider } from "react-redux";
import { AppProps } from "next/app";
import Head from "next/head";
import { ClerkProvider } from "@clerk/nextjs";
import { ConfirmProvider } from "material-ui-confirm";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "../styles/globals.css";
import { RadioProvider } from "../Components/RadioContext";
import { SideNavProvider } from "../Components/Nav/NavContext";
import { store } from "../redux/store";
import { UserProvider } from "../Components/UserContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SideNavProvider>
        <ConfirmProvider>
          <Provider store={store}>
            <RadioProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ClerkProvider
                  {...pageProps}
                  publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
                >
                  <UserProvider>
                    <Head>
                      <meta
                        name="viewport"
                        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
                      />
                      <title>Serving the People</title>
                    </Head>
                    <Component {...pageProps} />
                  </UserProvider>
                </ClerkProvider>
              </LocalizationProvider>
            </RadioProvider>
          </Provider>
        </ConfirmProvider>
      </SideNavProvider>
    </>
  );
}
