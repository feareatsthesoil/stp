"use client";

import { store } from "@/redux/store";
import { ConfirmProvider } from "material-ui-confirm";
import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { WagmiConfig, configureChains, createClient, mainnet } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

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

export const AllClientContexts = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiConfig client={client}>
      <SnackbarProvider>
        <ConfirmProvider>
          <Provider store={store}>{children}</Provider>
        </ConfirmProvider>
      </SnackbarProvider>
    </WagmiConfig>
  );
};
