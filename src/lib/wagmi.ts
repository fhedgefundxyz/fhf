import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains';
import { http } from 'wagmi';

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY;

export const config = getDefaultConfig({
  appName: 'FhedgeFund',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'demo',
  chains: [base],
  transports: {
    [base.id]: alchemyKey
      ? http(`https://base-mainnet.g.alchemy.com/v2/${alchemyKey}`)
      : http(),
  },
  ssr: true,
});
