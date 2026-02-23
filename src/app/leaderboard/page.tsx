'use client';

import { useState } from 'react';
import { Reveal, Skeleton } from '@/components/ui';
import { useLeaderboard } from '@/lib/hooks';
import { fmt, fmtN } from '@/lib/utils';

export default function LeaderboardPage() {
  const [sort, setSort] = useState('fees7d');
  const { data: projects, isLoading } = useLeaderboard(sort);

  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-10 pt-28 pb-20">
      <Reveal>
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-[52px] gap-4">
          <div>
            <div className="font-mono text-[10px] text-[#575854] tracking-[0.14em] uppercase mb-3">Flaunch Ecosystem</div>
            <h1 className="font-serif text-[36px] md:text-[44px] font-normal text-[#E8E6E3] tracking-[-0.03em]">Leaderboard</h1>
          </div>
          <div className="flex gap-[3px]">
            {[{ k: 'fees7d', l: 'Fees' }, { k: 'volume7d', l: 'Volume' }, { k: 'holders', l: 'Holders' }].map((s) => (
              <button key={s.k} onClick={() => setSort(s.k)} className="px-3.5 py-[7px] rounded-md font-mono text-[10px] cursor-pointer"
                style={{ background: sort === s.k ? 'var(--accent-dim)' : 'transparent', border: `1px solid ${sort === s.k ? 'var(--accent-border)' : 'var(--border)'}`, color: sort === s.k ? '#575854' : 'var(--tx-dim)' }}>
                {s.l}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div className="bg-[#0A0A0A] rounded-[14px] overflow-hidden" style={{ border: '1px solid var(--border)' }}>
          {isLoading ? (
            <div className="p-6 flex flex-col gap-3">{Array(8).fill(0).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]" style={{ borderCollapse: 'collapse' }}>
                <thead><tr>
                  {['#', 'Project', 'Fees (7d)', 'Volume (7d)', 'Holders', 'Age', 'Trend', 'Fund Position'].map(h => (
                    <th key={h} className="text-left font-mono text-[9px] tracking-[0.12em] uppercase font-normal"
                      style={{ padding: 16, borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.01)', color: 'var(--tx-dim)' }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {projects?.map((p) => {
                    const daysSinceLaunch = Math.floor((Date.now() - new Date(p.launchedAt).getTime()) / 86400000);
                    return (
                      <tr key={p.id} className="table-row">
                        <td className="p-4" style={{ borderBottom: '1px solid var(--border)' }}>
                          <span className="font-serif text-base" style={{ color: p.rank <= 3 ? '#575854' : 'var(--tx-dim)', fontStyle: p.rank <= 3 ? 'italic' : 'normal' }}>{p.rank}</span>
                        </td>
                        <td className="p-4 font-serif text-base text-[#E8E6E3]" style={{ borderBottom: '1px solid var(--border)' }}>{p.name}</td>
                        <td className="p-4 font-mono text-xs text-[#34D399]" style={{ borderBottom: '1px solid var(--border)' }}>{fmt(p.fees7d)}</td>
                        <td className="p-4 font-mono text-xs" style={{ borderBottom: '1px solid var(--border)', color: 'var(--tx-muted)' }}>{fmt(p.volume7d)}</td>
                        <td className="p-4 font-mono text-xs" style={{ borderBottom: '1px solid var(--border)', color: 'var(--tx-muted)' }}>{fmtN(p.holders)}</td>
                        <td className="p-4 font-mono text-[11px]" style={{ borderBottom: '1px solid var(--border)', color: 'var(--tx-dim)' }}>{daysSinceLaunch}d</td>
                        <td className="p-4" style={{ borderBottom: '1px solid var(--border)' }}>
                          <span className="font-mono text-[13px]" style={{ color: p.trend === 1 ? '#34D399' : p.trend === -1 ? '#FB7185' : 'var(--tx-dim)' }}>
                            {p.trend === 1 ? '▲' : p.trend === -1 ? '▼' : '—'}
                          </span>
                        </td>
                        <td className="p-4" style={{ borderBottom: '1px solid var(--border)' }}>
                          {p.inFund && p.fundAllocation ? (
                            <span className="inline-flex items-center gap-[5px] rounded-[5px] px-2.5 py-[3px] font-mono text-[10px] text-[#575854]"
                              style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)' }}>
                              {p.fundAllocation}% allocated
                            </span>
                          ) : <span className="font-mono text-[10px]" style={{ color: 'var(--tx-dim)' }}>—</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="mt-5 px-5 py-3.5 rounded-[10px] font-body text-[13px] leading-[1.6]"
          style={{ border: '1px solid var(--border)', color: 'var(--tx-dim)' }}>
          Rankings refresh hourly. FHF allocation decisions informed by this data plus proprietary on-chain analytics.
        </div>
      </Reveal>
    </div>
  );
}
