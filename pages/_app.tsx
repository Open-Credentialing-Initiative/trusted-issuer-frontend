import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import {darkTheme, getDefaultWallets, lightTheme, RainbowKitProvider} from '@rainbow-me/rainbowkit';
import type {AppProps} from 'next/app';
import {configureChains, createConfig, WagmiConfig} from 'wagmi';
import {goerli, mainnet,} from 'wagmi/chains';
import {publicProvider} from 'wagmi/providers/public';
import {SafeConnector} from 'wagmi/connectors/safe';

const {chains, publicClient, webSocketPublicClient} = configureChains(
  [
    mainnet,
    goerli
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: "projectId",
  chains,
});

const safeConnector = new SafeConnector({
  chains,
  options: {
    allowedDomains: [/app.safe.global$/],
    debug: false,
  },
})

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: [...connectors(), safeConnector],
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
