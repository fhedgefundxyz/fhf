'use client';

import Link from 'next/link';
import { Reveal } from '@/components/ui';
import { useStats } from '@/lib/hooks';
import { fmt, fmtN } from '@/lib/utils';

export default function FundPage() {
  const { data: stats } = useStats();

  return (
    <>
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-10 max-w-[1280px] mx-auto">
        {/* <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-[5px] pl-2.5 mb-10 w-fit"
            style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)' }}>
            <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }} />
            <span className="font-mono text-[10.5px] text-[#575854] tracking-[0.1em] uppercase font-medium">Live on Base Network</span>
          </div>
        </Reveal> */}

        <Reveal delay={100}>
          <h1 className="font-serif font-normal leading-[0.92] tracking-[-0.035em] text-[#E8E6E3] max-w-[900px] mb-8"
            style={{ fontSize: 'clamp(56px, 7.5vw, 108px)' }}>
            Diversified<br/>yield from<br/>
            <span className="text-[#575854] italic">Flaunch&apos;s</span> best
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="font-body text-xl max-w-[520px] leading-[1.65] font-light mb-12" style={{ color: 'var(--tx-muted)' }}>
            FHF is a transparent, on-chain fund that allocates treasury into the highest fee-generating Flaunch projects and distributes yield to token holders.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="flex gap-3.5 flex-wrap">
            <Link href="https://x.com/fhedgefundxyz" target="_blank" className="bg-[#ffffff] text-[#050505] px-8 py-[15px] rounded-[10px] font-mono text-xs font-semibold tracking-[0.04em] uppercase no-underline transition-transform hover:-translate-y-px">
              <span><img src="/twitter_fhf.png" className="w-4 h-4 mr-2 inline-block" alt="X Logo" /></span>X →
            </Link>
            <Link href="https://discord.gg/tyeMvbzRj" target="_blank" className="px-8 py-[15px] rounded-[10px] font-mono text-xs text-[#E8E6E3] tracking-[0.04em] uppercase no-underline transition-colors hover:border-[rgba(200,255,0,0.2)]"
              style={{ border: '1px solid var(--border-light)' }}>
              <span><img src="/discord_fhf.png" className="w-4 h-4 mr-2 inline-block" alt="Discord Logo" /></span>Discord
            </Link>
          </div>
        </Reveal>

        {/* <Reveal delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 mt-[100px] pt-10" style={{ borderTop: '1px solid var(--border)' }}>
            {[
              { l: 'Total Value Locked', v: stats ? fmt(stats.tvl) : '$—', s: '+12.4% 30d' },
              { l: 'Fees Collected', v: stats ? fmt(stats.totalFees) : '$—', s: '+8.2% 7d' },
              { l: 'Current APY', v: stats ? `${stats.apy}%` : '—%', s: '+2.1% vs prev' },
              { l: 'FHF Holders', v: stats ? fmtN(stats.holders) : '—', s: '+184 this week' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="font-mono text-[10px] tracking-[0.12em] uppercase mb-2.5" style={{ color: 'var(--tx-dim)' }}>{stat.l}</div>
                <div className="font-serif text-[32px] md:text-[38px] text-[#E8E6E3] tracking-[-0.03em] leading-none">{stat.v}</div>
                <div className="font-mono text-[11px] text-[#34D399] mt-2">{stat.s}</div>
              </div>
            ))}
          </div>
        </Reveal> */}
      </section>

      {/* How it works */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-10 py-[140px] pb-[120px]" style={{ borderTop: '1px solid var(--border)' }}>
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-[72px] gap-6">
            <div>
              <div className="font-mono text-[10px] text-[#575854] tracking-[0.14em] uppercase mb-4">Mechanism</div>
              <h2 className="font-serif text-[36px] md:text-[48px] font-normal text-[#E8E6E3] tracking-[-0.03em] leading-[1.05]">How the fund works</h2>
            </div>
            <p className="font-body text-base font-light md:text-right max-w-[380px]" style={{ color: 'var(--tx-muted)' }}>
              A systematic approach to capturing yield from Flaunch&apos;s top-performing tokens</p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 rounded-2xl overflow-hidden" style={{ gap: 1, background: 'var(--border)' }}>
          {[
            { n: '01', t: 'Acquire FHF', d: "Purchase FHF on Flaunch. A single token gives you pro-rata exposure to the fund's diversified portfolio of top projects." },
            { n: '02', t: 'Capital Deployment', d: 'Treasury is deployed into the highest fee-generating Flaunch tokens. Positions are rebalanced weekly based on quantitative signals.' },
            { n: '03', t: 'Yield Distribution', d: 'Stake FHF to earn ETH from fund profits. A portion of revenue fuels buyback-and-burn, creating structural deflation.' },
          ].map((step, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="card-hover bg-[#0A0A0A] p-9 md:p-[48px_36px] min-h-[260px] md:min-h-[280px] flex flex-col">
                <span className="font-serif text-[48px] md:text-[64px] italic leading-none mb-6" style={{ color: 'rgba(200,255,0,0.06)' }}>{step.n}</span>
                <h3 className="font-serif text-[22px] md:text-[26px] font-normal text-[#E8E6E3] tracking-[-0.02em] mb-4">{step.t}</h3>
                <p className="font-body text-[15px] leading-[1.7] font-light flex-1" style={{ color: 'var(--tx-muted)' }}>{step.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Value accrual */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-10 pb-[140px]">
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden" style={{ gap: 1, background: 'var(--border)' }}>
          {[
            { icon: '↻', label: 'Buyback & Burn', desc: 'Fund profits buy FHF on the open market and permanently burn tokens, reducing circulating supply.', stat: '12.4K', statLabel: 'FHF burned to date' },
            { icon: '◆', label: 'Staking Yield', desc: 'Stake FHF to claim your share of ETH revenue. Distributions flow weekly, proportional to your position.', stat: '0.82', statLabel: 'ETH distributed last week' },
          ].map((v, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="card-hover bg-[#0A0A0A] p-9 md:p-[56px_44px]">
                <div className="font-serif text-[28px] text-[#575854] italic mb-7">{v.icon}</div>
                <h3 className="font-serif text-[24px] md:text-[28px] font-normal text-[#E8E6E3] tracking-[-0.02em] mb-4">{v.label}</h3>
                <p className="font-body text-[15px] leading-[1.7] font-light mb-8" style={{ color: 'var(--tx-muted)' }}>{v.desc}</p>
                <div className="pt-5" style={{ borderTop: '1px solid var(--border)' }}>
                  {/* <div className="font-serif text-[32px] text-[#E8E6E3] tracking-[-0.02em]">{v.stat}</div> */}
                  {/* <div className="font-mono text-[10px] tracking-[0.1em] uppercase mt-1" style={{ color: 'var(--tx-dim)' }}>{v.statLabel}</div> */}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      {/* <section className="max-w-[1280px] mx-auto px-6 md:px-10 py-[100px] pb-20 text-center" style={{ borderTop: '1px solid var(--border)' }}>
        <Reveal>
          <h2 className="font-serif font-normal text-[#E8E6E3] tracking-[-0.03em] leading-[1.05] mb-5" style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}>
            Stop guessing.<br/><span className="text-[#ababab] italic">Start earning.</span>
          </h2>
          <p className="font-body text-lg font-light mb-10" style={{ color: 'var(--tx-muted)' }}>One token. Managed exposure. Real yield.</p>
          <Link href="/stake" className="inline-block bg-[#ffffff] text-[#050505] px-10 py-4 rounded-[10px] font-mono text-[13px] font-semibold tracking-[0.04em] uppercase no-underline transition-transform hover:-translate-y-px">
            Buy FHF on Flaunch
          </Link>
        </Reveal>
      </section> */}

      {/* Footer */}
      <footer className="max-w-[1280px] mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid var(--border)' }}>
        <span className="font-mono text-[10px] tracking-[0.06em]" style={{ color: 'var(--tx-dim)' }}>© 2026 FHEDGEFUND · ALL POSITIONS ON-CHAIN</span>
        <div className="flex gap-6">
          {[
            { name: 'Twitter', href: 'https://x.com/fhedgefundxyz' },
            // { name: 'Telegram', href: 'https://t.me/fhedgefund' },
            { name: 'Discord', href: 'https://discord.gg/tyeMvbzRj' },
            // { name: 'Basescan', href: 'https://basescan.org/token/0x7820c7213850c42f81c753e4f09b6a512c9f8e4d' },
          ].map((l) => (
            <Link key={l.name} href={l.href} target="_blank" className="font-mono text-[10px] no-underline tracking-[0.06em] uppercase transition-colors hover:text-[#575854]" style={{ color: 'var(--tx-dim)' }}>
              {l.name}
            </Link>
          ))}
        </div>
      </footer>
    </>
  );
}
