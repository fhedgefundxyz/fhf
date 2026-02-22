import type { Metadata } from 'next';
import '@rainbow-me/rainbowkit/styles.css';
import './globals.css';
import Nav from '@/components/Nav';
import { GridBg } from '@/components/ui';
import { Web3Provider } from '@/providers/Web3Provider';

export const metadata: Metadata = {
  title: 'FhedgeFund — The S&P 500 of Flaunch',
  description: 'Transparent on-chain fund. Diversified yield from Flaunch\'s top projects. One token, managed exposure, real yield.',
  openGraph: {
    title: 'FhedgeFund — Diversified Yield from Flaunch\'s Best',
    description: 'One token. Managed exposure. Real yield. Fully on-chain on Base.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FhedgeFund',
    description: 'The S&P 500 of Flaunch.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Web3Provider>
          <GridBg />
          <Nav />
          <main className="relative z-[1]">{children}</main>
        </Web3Provider>
      </body>
    </html>
  );
}
