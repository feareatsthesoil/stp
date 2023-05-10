import { Provider } from "react-redux";
import { AppProps } from "next/app";
import Head from "next/head";
import { ClerkProvider } from "@clerk/nextjs";
import { ConfirmProvider } from "material-ui-confirm";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { WagmiConfig, createClient, configureChains, mainnet } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { SnackbarProvider } from "notistack";

import "../styles/globals.css";
import { RadioProvider } from "../Components/RadioContext";
import { SideNavProvider } from "../Components/Nav/NavContext";
import { store } from "../redux/store";
import { UserProvider } from "../Components/UserContext";

const { provider, webSocketProvider } = configureChains(
  [mainnet],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_NODE_ALCHEMY_KEY || "",
      priority: 0,
    }),
    publicProvider({ priority: 1 }),
  ]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors: [
    new MetaMaskConnector(),
    new WalletConnectConnector({
      options: {
        showQrModal: true,
        projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "",
      },
    }),
    new CoinbaseWalletConnector({
      options: {
        appName: "stp-home",
        jsonRpcUrl: `https://eth-mainnet.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_NODE_ALCHEMY_KEY}`,
      },
    }),
  ],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <WagmiConfig client={client}>
        <SideNavProvider>
          <SnackbarProvider>
            <ConfirmProvider>
              <Provider store={store}>
                <RadioProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <ClerkProvider
                      {...pageProps}
                      publishableKey={
                        process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
                      }
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
          </SnackbarProvider>
        </SideNavProvider>
      </WagmiConfig>
    </>
  );
}
