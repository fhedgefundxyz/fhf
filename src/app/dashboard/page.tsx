'use client';

import { useState } from 'react';
import { Reveal, Skeleton } from '@/components/ui';
import { usePortfolio, useActivity, useStats } from '@/lib/hooks';
import { fmt, timeAgo } from '@/lib/utils';

export default function DashboardPage() {
  const [tf, setTf] = useState('7d');
  const { data: portfolio, isLoading: pLoading } = usePortfolio();
  const { data: activity, isLoading: aLoading } = useActivity();
  const { data: stats, isLoading: sLoading } = useStats();

  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-10 pt-28 pb-20">
      <Reveal>
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-[52px] gap-4">
          <div>
            <div className="font-mono text-[10px] text-[#575854] tracking-[0.14em] uppercase mb-3">Fund Performance</div>
            <h1 className="font-serif text-[36px] md:text-[44px] font-normal text-[#E8E6E3] tracking-[-0.03em]">Dashboard</h1>
          </div>
          <div className="flex gap-[3px]">
            {['24h', '7d', '30d', 'All'].map((t) => (
              <button key={t} onClick={() => setTf(t)} className="px-3.5 py-[7px] rounded-md font-mono text-[10px] tracking-[0.06em] cursor-pointer"
                style={{ background: tf === t ? 'var(--accent-dim)' : 'transparent', border: `1px solid ${tf === t ? 'var(--accent-border)' : 'var(--border)'}`, color: tf === t ? '#575854' : 'var(--tx-dim)' }}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Stats */}
      <Reveal delay={100}>
        <div className="grid grid-cols-2 md:grid-cols-4 rounded-[14px] overflow-hidden mb-7" style={{ gap: 1, background: 'var(--border)' }}>
          {(sLoading ? Array(4).fill({ l: '', v: '', s: '', p: true }) : [
            { l: 'TVL', v: fmt(stats!.tvl), s: '+12.4%', p: true },
            { l: 'Fees (7d)', v: fmt(stats!.totalFees), s: '+8.2%', p: true },
            { l: 'Fund APY', v: `${stats!.apy}%`, s: '+2.1%', p: true },
            { l: 'Weekly Return', v: `${stats!.weeklyReturn}%`, s: '-0.3%', p: false },
          ]).map((s, i) => (
            <div key={i} className="bg-[#0A0A0A] p-[24px_20px] md:p-[28px_24px]">
              {sLoading ? <Skeleton className="h-16 w-full" /> : <>
                <div className="font-mono text-[9.5px] tracking-[0.12em] uppercase mb-3" style={{ color: 'var(--tx-dim)' }}>{s.l}</div>
                <div className="font-serif text-[24px] md:text-[30px] text-[#E8E6E3] tracking-[-0.02em]">{s.v}</div>
                <div className="font-mono text-[11px] mt-1.5" style={{ color: s.p ? '#34D399' : '#FB7185' }}>{s.s}</div>
              </>}
            </div>
          ))}
        </div>
      </Reveal>

      {/* Holdings + Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] rounded-[14px] overflow-hidden mb-7" style={{ gap: 1, background: 'var(--border)' }}>
        <Reveal delay={200}>
          <div className="bg-[#0A0A0A] p-5 md:p-[28px_28px_16px]">
            <h3 className="font-serif text-[22px] font-normal text-[#E8E6E3] tracking-[-0.02em] mb-6">Portfolio Holdings</h3>
            {pLoading ? <div className="flex flex-col gap-3">{Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</div> : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px]" style={{ borderCollapse: 'collapse' }}>
                  <thead><tr>
                    {['Token', 'Weight', 'Fees 24h', 'Volume 24h', '7d'].map(h => (
                      <th key={h} className="text-left font-mono text-[9px] tracking-[0.12em] uppercase font-normal" style={{ padding: '0 12px 14px', borderBottom: '1px solid var(--border)', color: 'var(--tx-dim)' }}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {portfolio?.map((h, i) => (
                      <tr key={h.id} className="table-row">
                        <td className="p-[14px_12px]" style={{ borderBottom: '1px solid var(--border)' }}>
                          <div className="flex items-center gap-2.5">
                            <div className="w-[30px] h-[30px] rounded-[7px] flex items-center justify-center font-mono text-[9px] font-semibold text-[#575854]"
                              style={{ background: `rgba(200,255,0,${0.04 + i * 0.015})`, border: `1px solid rgba(200,255,0,${0.08 + i * 0.02})` }}>
                              {h.tokenSymbol.slice(0, 2)}
                            </div>
                            <span className="font-serif text-[15px] text-[#E8E6E3]">{h.tokenName}</span>
                          </div>
                        </td>
                        <td className="p-[14px_12px]" style={{ borderBottom: '1px solid var(--border)' }}>
                          <div className="flex items-center gap-2.5">
                            <div className="w-12 h-[3px] rounded-sm" style={{ background: 'rgba(255,255,255,0.04)' }}>
                              <div className="h-full rounded-sm bg-[#575854] opacity-60" style={{ width: `${(h.allocation / 22) * 100}%` }} />
                            </div>
                            <span className="font-mono text-xs" style={{ color: 'var(--tx-muted)' }}>{h.allocation}%</span>
                          </div>
                        </td>
                        <td className="p-[14px_12px] font-mono text-xs text-[#34D399]" style={{ borderBottom: '1px solid var(--border)' }}>{fmt(h.fees24h)}</td>
                        <td className="p-[14px_12px] font-mono text-xs" style={{ borderBottom: '1px solid var(--border)', color: 'var(--tx-muted)' }}>{fmt(h.volume24h)}</td>
                        <td className="p-[14px_12px] font-mono text-xs" style={{ borderBottom: '1px solid var(--border)', color: h.change7d >= 0 ? '#34D399' : '#FB7185' }}>
                          {h.change7d > 0 ? '+' : ''}{h.change7d}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="bg-[#0A0A0A] p-7 flex flex-col">
            <h3 className="font-serif text-[22px] font-normal text-[#E8E6E3] mb-7">Allocation</h3>
            <div className="flex-1 flex flex-col gap-3.5">
              {portfolio?.map((h, i) => (
                <div key={h.id} className="flex items-center gap-2.5">
                  <div className="w-1 h-1 rounded-full bg-[#575854]" style={{ opacity: 1 - i * 0.1 }} />
                  <span className="font-body text-sm flex-1" style={{ color: 'var(--tx-muted)' }}>{h.tokenName}</span>
                  <span className="font-mono text-[11px]" style={{ color: 'var(--tx-dim)' }}>{h.allocation}%</span>
                </div>
              ))}
            </div>
            <div className="mt-7 p-[18px_16px] rounded-[10px]" style={{ background: 'rgba(200,255,0,0.03)', border: '1px solid var(--accent-border)' }}>
              <div className="font-mono text-[9px] tracking-[0.1em] uppercase mb-2" style={{ color: 'var(--tx-dim)' }}>Treasury Multisig</div>
              <div className="font-mono text-[11.5px] text-[#575854]">{stats?.treasuryAddress ? `${stats.treasuryAddress.slice(0, 10)}...${stats.treasuryAddress.slice(-6)}` : '—'}</div>
              <div className="font-mono text-[9.5px] mt-1.5" style={{ color: 'var(--tx-dim)' }}>Verifiable on Basescan ↗</div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Activity */}
      <Reveal delay={400}>
        <div className="bg-[#0A0A0A] rounded-[14px] p-5 md:p-7" style={{ border: '1px solid var(--border)' }}>
          <h3 className="font-serif text-[22px] font-normal text-[#E8E6E3] mb-6">Recent Activity</h3>
          {aLoading ? <div className="flex flex-col gap-3">{Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</div> :
            activity?.map((a, i) => (
              <div key={a.id} className="flex items-center gap-4 py-3.5" style={{ borderBottom: i < (activity?.length || 0) - 1 ? '1px solid var(--border)' : 'none' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center font-serif text-sm italic"
                  style={{
                    background: a.type === 'fee' || a.type === 'distribute' ? 'rgba(52,211,153,0.06)' : a.type === 'burn' ? 'rgba(251,113,133,0.06)' : 'rgba(200,255,0,0.04)',
                    border: `1px solid ${a.type === 'fee' || a.type === 'distribute' ? 'rgba(52,211,153,0.12)' : a.type === 'burn' ? 'rgba(251,113,133,0.12)' : 'var(--accent-border)'}`,
                    color: a.type === 'fee' || a.type === 'distribute' ? '#34D399' : a.type === 'burn' ? '#FB7185' : '#575854',
                  }}>
                  {a.type === 'fee' ? '$' : a.type === 'burn' ? '↓' : a.type === 'distribute' ? '◆' : '↻'}
                </div>
                <div className="flex-1 font-body text-sm text-[#E8E6E3]">{a.description}</div>
                <span className="font-mono text-[10px]" style={{ color: 'var(--tx-dim)' }}>{timeAgo(new Date(a.createdAt))}</span>
              </div>
            ))
          }
        </div>
      </Reveal>
    </div>
  );
}
