"use client";

import { createWeb3Modal } from '@web3modal/wagmi/react'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { polygonMumbai } from 'viem/chains'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { ReactNode } from 'react';

const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()]
)

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID!;

const metadata = {
  name: 'Forward Finance',
  description: 'Forward Finance',
  url: 'https://forward-finance.vercel.app',
}

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({ chains, options: { projectId, showQrModal: false, metadata } }),
    new InjectedConnector({ chains, options: { shimDisconnect: true } })
  ],
  publicClient
})

createWeb3Modal({ wagmiConfig, projectId, chains })

export function Web3Modal({ children }: { children: ReactNode }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}