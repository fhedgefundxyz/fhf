'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// ─── Types ─────────────────────────────────────────────

export interface FundStats {
  tvl: number;
  totalFees: number;
  apy: number;
  holders: number;
  weeklyReturn: number;
  monthlyReturn: number;
  treasuryAddress: string;
}

export interface PortfolioHolding {
  id: string;
  tokenName: string;
  tokenSymbol: string;
  allocation: number;
  fees24h: number;
  volume24h: number;
  change7d: number;
}

export interface FlaunchProject {
  id: string;
  rank: number;
  name: string;
  ticker: string;
  fees7d: number;
  volume7d: number;
  holders: number;
  trend: number;
  inFund: boolean;
  fundAllocation: number | null;
  launchedAt: string;
}

export interface FundActivityItem {
  id: string;
  type: string;
  description: string;
  amount: number | null;
  createdAt: string;
}

export interface StakeDistribution {
  id: string;
  totalEth: number;
  totalUsd: number;
  stakersCount: number;
  distributedAt: string;
}

export interface StakingData {
  distributions: StakeDistribution[];
  totalStaked: number;
  totalStakers: number;
}

// ─── Fetchers ──────────────────────────────────────────

const fetchJSON = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  return res.json();
};

// ─── Hooks ─────────────────────────────────────────────

export function useStats() {
  return useQuery<FundStats>({
    queryKey: ['stats'],
    queryFn: () => fetchJSON('/api/stats'),
    staleTime: 30_000, // 30s
  });
}

export function usePortfolio() {
  return useQuery<PortfolioHolding[]>({
    queryKey: ['portfolio'],
    queryFn: () => fetchJSON('/api/portfolio'),
    staleTime: 30_000,
  });
}

export function useLeaderboard(sort: string = 'fees7d') {
  return useQuery<FlaunchProject[]>({
    queryKey: ['leaderboard', sort],
    queryFn: () => fetchJSON(`/api/leaderboard?sort=${sort}`),
    staleTime: 60_000, // 1min
  });
}

export function useActivity() {
  return useQuery<FundActivityItem[]>({
    queryKey: ['activity'],
    queryFn: () => fetchJSON('/api/activity'),
    staleTime: 30_000,
  });
}

export function useStakingData() {
  return useQuery<StakingData>({
    queryKey: ['staking'],
    queryFn: () => fetchJSON('/api/stake'),
    staleTime: 30_000,
  });
}

export function useStake() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ walletAddress, amount }: { walletAddress: string; amount: number }) => {
      const res = await fetch('/api/stake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress, amount }),
      });
      if (!res.ok) throw new Error('Stake failed');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staking'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
}
