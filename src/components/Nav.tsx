'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const links = [
  { href: '/', label: 'fund' },
  { href: '/dashboard', label: 'dashboard' },
  { href: '/leaderboard', label: 'leaderboard' },
  { href: '/stake', label: 'stake' },
];

export default function Nav() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[999]"
      style={{
        background: 'rgba(5,5,5,0.8)',
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline">
          <div className="w-9 h-9 bg-[#C8FF00] rounded-lg flex items-center justify-center font-serif text-lg text-[#050505]">
            F
          </div>
          <div className="hidden sm:block">
            <div className="font-serif text-[18px] text-[#E8E6E3] tracking-tight leading-none">
              FhedgeFund
            </div>
            <div
              className="font-mono text-[8px] tracking-[0.14em] uppercase"
              style={{ color: 'rgba(255,255,255,0.22)' }}
            >
              ON-CHAIN FUND
            </div>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative px-4 py-2 rounded-md no-underline font-mono text-[11px] tracking-[0.04em] uppercase transition-colors"
              style={{ color: isActive(l.href) ? '#C8FF00' : 'rgba(255,255,255,0.45)' }}
            >
              {l.label}
              {isActive(l.href) && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-[#C8FF00]" />
              )}
            </Link>
          ))}
        </nav>

        {/* RainbowKit Connect Button */}
        <ConnectButton.Custom>
          {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
            const ready = mounted;
            const connected = ready && account && chain;

            return (
              <div {...(!ready && { 'aria-hidden': true, style: { opacity: 0, pointerEvents: 'none' as const, userSelect: 'none' as const } })}>
                {!connected ? (
                  <button
                    onClick={openConnectModal}
                    className="bg-[#C8FF00] text-[#050505] px-5 py-2.5 rounded-lg font-mono text-[11px] font-semibold tracking-[0.06em] uppercase cursor-pointer transition-transform hover:-translate-y-px"
                    style={{ boxShadow: '0 2px 12px rgba(200,255,0,0.15)' }}
                  >
                    Connect
                  </button>
                ) : chain.unsupported ? (
                  <button
                    onClick={openChainModal}
                    className="bg-[#FB7185] text-white px-5 py-2.5 rounded-lg font-mono text-[11px] font-semibold uppercase cursor-pointer"
                  >
                    Wrong Network
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={openChainModal}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg font-mono text-[10px] uppercase cursor-pointer"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: 'rgba(255,255,255,0.45)',
                      }}
                    >
                      {chain.hasIcon && chain.iconUrl && (
                        <img src={chain.iconUrl} alt={chain.name ?? ''} className="w-4 h-4 rounded-full" />
                      )}
                      {chain.name}
                    </button>
                    <button
                      onClick={openAccountModal}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-[11px] cursor-pointer"
                      style={{
                        background: 'rgba(200,255,0,0.12)',
                        border: '1px solid rgba(200,255,0,0.2)',
                        color: '#C8FF00',
                      }}
                    >
                      {account.displayName}
                      {account.displayBalance && (
                        <span style={{ color: 'rgba(255,255,255,0.35)' }}>
                          {account.displayBalance}
                        </span>
                      )}
                    </button>
                  </div>
                )}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
    </header>
  );
}
