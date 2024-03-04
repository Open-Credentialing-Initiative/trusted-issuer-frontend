import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import {getDefaultWallets, lightTheme, RainbowKitProvider} from '@rainbow-me/rainbowkit';
import type {AppProps} from 'next/app';
import {configureChains, createConfig, mainnet, sepolia, WagmiConfig} from 'wagmi';
import {SafeConnector} from 'wagmi/connectors/safe';
import {infuraProvider} from "wagmi/providers/infura";
import {publicProvider} from "wagmi/providers/public";

const {chains, publicClient, webSocketPublicClient} = configureChains(
  [mainnet, sepolia],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY ?? ''}),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'OCI Trusted Issuers',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? '',
  chains
});

const safeConnector = new SafeConnector({
  chains,
  options: {
    allowedDomains: [/app.safe.global$/],
    debug: false,
  }
})

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: [safeConnector, ...connectors()],
  publicClient,
  webSocketPublicClient,
});

function App({Component, pageProps}: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={lightTheme()} >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
