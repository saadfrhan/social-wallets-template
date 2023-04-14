"use client";

import {
  googleWallet,
  facebookWallet,
  githubWallet,
  discordWallet,
  twitchWallet,
  twitterWallet,
  enhanceWalletWithAAConnector
} from '@zerodevapp/wagmi/rainbowkit'
import {
  metaMaskWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit'
import { polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

export default function WagmiRainbowKitProvider({
  children
}: { children: React.ReactNode }) {

  const { chains, provider } = configureChains(
    [polygonMumbai],
    [publicProvider()],
  )

  const connectors = connectorsForWallets([
    {
      groupName: 'Social',
      wallets: [
        googleWallet({ options: { projectId: process.env.PROJECT_ID! } }),
        facebookWallet({ options: { projectId: process.env.PROJECT_ID! } }),
        githubWallet({ options: { projectId: process.env.PROJECT_ID! } }),
        discordWallet({ options: { projectId: process.env.PROJECT_ID! } }),
        twitchWallet({ options: { projectId: process.env.PROJECT_ID! } }),
        twitterWallet({ options: { projectId: process.env.PROJECT_ID! } })
      ],
    },
    {
      groupName: 'AA Wallets',
      wallets: [
        enhanceWalletWithAAConnector(
          metaMaskWallet({ chains }),
          { projectId: process.env.PROJECT_ID! }
        ),
        enhanceWalletWithAAConnector(
          walletConnectWallet({ chains }),
          { projectId: process.env.PROJECT_ID! }
        ),
      ]
    },
  ]);


  const client = createClient({
    autoConnect: false,
    connectors,
    provider
  })

  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains} modalSize={'compact'}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}