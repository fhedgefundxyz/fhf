export const PORTFOLIO = [
  { name: "DEGEN", alloc: 22, fees: 4820, vol: 182000, chg: 14.2 },
  { name: "BRETT", alloc: 18, fees: 3910, vol: 156000, chg: 8.7 },
  { name: "TOSHI", alloc: 16, fees: 3200, vol: 128000, chg: -2.1 },
  { name: "MFER", alloc: 14, fees: 2870, vol: 98000, chg: 22.4 },
  { name: "BASED", alloc: 12, fees: 2100, vol: 84000, chg: 5.6 },
  { name: "NORMIE", alloc: 10, fees: 1780, vol: 71000, chg: -4.3 },
  { name: "DOGINME", alloc: 5, fees: 980, vol: 39000, chg: 31.2 },
  { name: "KEYCAT", alloc: 3, fees: 540, vol: 21000, chg: -1.8 },
];

export const LEADERBOARD = [
  { rank: 1, name: "DEGEN", fees: 38400, vol: 1420000, holders: 12840, age: "21d", trend: 1 },
  { rank: 2, name: "BRETT", fees: 31200, vol: 1180000, holders: 9620, age: "62d", trend: 1 },
  { rank: 3, name: "TOSHI", fees: 27800, vol: 980000, holders: 8100, age: "43d", trend: -1 },
  { rank: 4, name: "MFER", fees: 24100, vol: 870000, holders: 7200, age: "31d", trend: 1 },
  { rank: 5, name: "BASED", fees: 19800, vol: 720000, holders: 6400, age: "58d", trend: 0 },
  { rank: 6, name: "NORMIE", fees: 15600, vol: 580000, holders: 5100, age: "89d", trend: -1 },
  { rank: 7, name: "DOGINME", fees: 12400, vol: 410000, holders: 4300, age: "8d", trend: 1 },
  { rank: 8, name: "KEYCAT", fees: 9800, vol: 320000, holders: 3600, age: "36d", trend: 0 },
  { rank: 9, name: "ZORA", fees: 8200, vol: 270000, holders: 2900, age: "27d", trend: 1 },
  { rank: 10, name: "CLANKER", fees: 6800, vol: 210000, holders: 2100, age: "14d", trend: 1 },
];

export const ACTIVITY = [
  { type: "rebalance", text: "Increased DEGEN 18% → 22%", time: "2h ago" },
  { type: "fee", text: "Collected $4,820 from DEGEN LP", time: "6h ago" },
  { type: "entry", text: "Opened DOGINME position at 5%", time: "1d ago" },
  { type: "burn", text: "Burned 12,400 FHF ($8.2K)", time: "2d ago" },
  { type: "distribute", text: "Distributed 0.82 ETH to stakers", time: "3d ago" },
  { type: "rebalance", text: "Reduced NORMIE 14% → 10%", time: "4d ago" },
];

export const STATS = {
  tvl: 2480000,
  fees: 184200,
  apy: 34.2,
  holders: 1847,
  weeklyReturn: 4.8,
};

export const fmt = (n: number) => {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n}`;
};

export const fmtN = (n: number) => (n >= 1e3 ? `${(n / 1e3).toFixed(1)}K` : `${n}`);
