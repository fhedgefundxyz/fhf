'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Reveal, Skeleton } from '@/components/ui';
import { useStats, useStakingData, useStake } from '@/lib/hooks';
import { fmt } from '@/lib/utils';

export default function StakePage() {
  const [amt, setAmt] = useState('');
  const [tab, setTab] = useState<'stake' | 'unstake'>('stake');
  const { address, isConnected } = useAccount();
  const { data: stats } = useStats();
  const { data: staking, isLoading } = useStakingData();
  const stakeMutation = useStake();

  const handleStake = () => {
    if (!address || !amt || parseFloat(amt) <= 0) return;
    stakeMutation.mutate({ walletAddress: address, amount: parseFloat(amt) });
  };

  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-10 pt-28 pb-20">
      <Reveal>
        <div className="text-center mb-14">
          <div className="font-mono text-[10px] text-[#575854] tracking-[0.14em] uppercase mb-3">Yield Module</div>
          <h1 className="font-serif text-[36px] md:text-[44px] font-normal text-[#E8E6E3] tracking-[-0.03em] mb-2.5">Stake & Earn</h1>
          <p className="font-body text-[17px] font-light" style={{ color: 'var(--tx-muted)' }}>Stake FHF to receive ETH from fund revenue distributions</p>
        </div>
      </Reveal>

      {/* Yield Stats */}
      <Reveal delay={100}>
        <div className="grid grid-cols-2 md:grid-cols-4 rounded-[14px] overflow-hidden mb-10" style={{ gap: 1, background: 'var(--border)' }}>
          {[
            { l: 'Current APY', v: stats ? `${stats.apy}%` : '—', c: '#575854' },
            { l: 'Total Staked', v: staking ? fmt(staking.totalStaked) : '—', c: '#E8E6E3' },
            { l: 'Your Earnings', v: '0 ETH', c: '#34D399' },
            { l: 'Next Distribution', v: '4d 12h', c: '#E8E6E3' },
          ].map((s, i) => (
            <div key={i} className="bg-[#0A0A0A] p-[24px_20px] md:p-[28px_24px] text-center">
              <div className="font-mono text-[9px] tracking-[0.12em] uppercase mb-3" style={{ color: 'var(--tx-dim)' }}>{s.l}</div>
              <div className="font-serif text-[24px] md:text-[30px] tracking-[-0.02em]" style={{ color: s.c }}>{s.v}</div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Staking Card */}
      <Reveal delay={200}>
        <div className="max-w-[520px] mx-auto bg-[#0A0A0A] rounded-2xl p-6 md:p-9" style={{ border: '1px solid var(--border)' }}>
          {/* Tabs */}
          <div className="flex gap-[3px] mb-8 rounded-lg p-[3px]" style={{ background: 'rgba(255,255,255,0.02)' }}>
            {(['stake', 'unstake'] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className="flex-1 py-2.5 rounded-md font-mono text-[11px] tracking-[0.06em] uppercase cursor-pointer transition-all"
                style={{ background: tab === t ? 'var(--accent-dim)' : 'transparent', border: `1px solid ${tab === t ? 'var(--accent-border)' : 'transparent'}`, color: tab === t ? '#575854' : 'var(--tx-dim)' }}>
                {t}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="rounded-xl mb-6" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border)', padding: '20px 20px 16px' }}>
            <div className="flex justify-between mb-3.5">
              <span className="font-mono text-[9px] tracking-[0.1em] uppercase" style={{ color: 'var(--tx-dim)' }}>
                {tab === 'stake' ? 'Amount to Stake' : 'Amount to Unstake'}
              </span>
              <span className="font-mono text-[9.5px]" style={{ color: 'var(--tx-dim)' }}>Balance: 0 FHF</span>
            </div>
            <div className="flex items-center gap-3">
              <input type="number" value={amt} onChange={(e) => setAmt(e.target.value)} placeholder="0.00"
                className="flex-1 bg-transparent border-none outline-none font-serif text-[32px] md:text-[36px] font-normal text-[#E8E6E3] tracking-[-0.02em]" />
              <div className="flex items-center gap-[7px] rounded-lg px-3 py-2" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
                <div className="w-5 h-5 rounded-[5px] bg-[#575854] flex items-center justify-center font-serif text-[11px] text-[#050505]">F</div>
                <span className="font-mono text-xs text-[#E8E6E3] font-medium">FHF</span>
              </div>
            </div>
            <div className="flex gap-[5px] mt-3.5">
              {['25%', '50%', '75%', 'Max'].map((p) => (
                <button key={p} className="rounded-[5px] px-2.5 py-[3px] font-mono text-[9.5px] cursor-pointer transition-colors hover:border-[rgba(200,255,0,0.2)]"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--tx-dim)' }}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-3 mb-7">
            {[
              ['You receive', amt ? `${amt} stFHF` : '—'],
              ['Exchange rate', '1 FHF = 1 stFHF'],
              ['Est. weekly yield', amt ? `~${(parseFloat(amt || '0') * 0.0066).toFixed(4)} ETH` : '—'],
              ['Cooldown period', '7 days'],
            ].map(([l, v], i) => (
              <div key={i} className="flex justify-between">
                <span className="font-body text-[13.5px]" style={{ color: 'var(--tx-muted)' }}>{l}</span>
                <span className="font-mono text-xs" style={{ color: 'var(--tx-muted)' }}>{v}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          {!isConnected ? (
            <div className="flex justify-center">
              <ConnectButton />
            </div>
          ) : (
            <button onClick={handleStake}
              disabled={!amt || parseFloat(amt) <= 0 || stakeMutation.isPending}
              className="w-full py-[15px] rounded-[10px] font-mono text-xs font-semibold tracking-[0.06em] uppercase transition-all disabled:cursor-not-allowed"
              style={{
                background: amt ? '#575854' : 'rgba(255,255,255,0.04)',
                border: amt ? 'none' : '1px solid var(--border)',
                color: amt ? '#050505' : 'var(--tx-dim)',
              }}>
              {stakeMutation.isPending ? 'Processing...' : !amt ? 'Enter amount' : `${tab} FHF`}
            </button>
          )}

          {stakeMutation.isSuccess && (
            <div className="mt-4 p-[12px_16px] rounded-lg font-mono text-[11px] text-[#34D399] text-center"
              style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.15)' }}>
              ✓ Stake recorded — awaiting on-chain confirmation
            </div>
          )}
          {stakeMutation.isError && (
            <div className="mt-4 p-[12px_16px] rounded-lg font-mono text-[11px] text-[#FB7185] text-center"
              style={{ background: 'rgba(251,113,133,0.06)', border: '1px solid rgba(251,113,133,0.15)' }}>
              ✗ Failed to stake. Please try again.
            </div>
          )}
        </div>
      </Reveal>

      {/* Bottom cards */}
      <Reveal delay={300}>
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-[14px] overflow-hidden mt-10 max-w-[720px] mx-auto" style={{ gap: 1, background: 'var(--border)' }}>
          <div className="bg-[#0A0A0A] p-7">
            <h3 className="font-serif text-lg font-normal text-[#E8E6E3] mb-3.5">How staking works</h3>
            <p className="font-body text-[13.5px] leading-[1.7] font-light" style={{ color: 'var(--tx-muted)' }}>
              Staked FHF earns stFHF receipt tokens representing your pool share. ETH from fund revenue is distributed proportionally every 7 days. Unstaking has a 7-day cooldown.
            </p>
          </div>
          <div className="bg-[#0A0A0A] p-7">
            <h3 className="font-serif text-lg font-normal text-[#E8E6E3] mb-3.5">Recent distributions</h3>
            {isLoading ? <div className="flex flex-col gap-2">{Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-6 w-full" />)}</div> :
              staking?.distributions.map((d) => (
                <div key={d.id} className="flex justify-between mb-2.5">
                  <span className="font-mono text-[11px]" style={{ color: 'var(--tx-dim)' }}>{new Date(d.distributedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  <span className="font-mono text-[11px] text-[#34D399]">{d.totalEth} ETH</span>
                  <span className="font-mono text-[10px]" style={{ color: 'var(--tx-dim)' }}>${d.totalUsd.toLocaleString()}</span>
                </div>
              ))
            }
          </div>
        </div>
      </Reveal>
    </div>
  );
}
