// Fallback data when database is not connected
// This allows the app to work without PostgreSQL during development

export const FALLBACK_STATS = {
  id: 'singleton',
  tvl: 2480000,
  totalFees: 184200,
  apy: 34.2,
  holders: 1847,
  weeklyReturn: 4.8,
  monthlyReturn: 18.6,
  treasuryAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f8B3Fc2',
  updatedAt: new Date().toISOString(),
};

export const FALLBACK_PORTFOLIO = [
  { id: '1', tokenName: 'DEGEN', tokenSymbol: 'DEGEN', allocation: 22, fees24h: 4820, volume24h: 182000, change7d: 14.2, contractAddress: '', isActive: true },
  { id: '2', tokenName: 'BRETT', tokenSymbol: 'BRETT', allocation: 18, fees24h: 3910, volume24h: 156000, change7d: 8.7, contractAddress: '', isActive: true },
  { id: '3', tokenName: 'TOSHI', tokenSymbol: 'TOSHI', allocation: 16, fees24h: 3200, volume24h: 128000, change7d: -2.1, contractAddress: '', isActive: true },
  { id: '4', tokenName: 'MFER', tokenSymbol: 'MFER', allocation: 14, fees24h: 2870, volume24h: 98000, change7d: 22.4, contractAddress: '', isActive: true },
  { id: '5', tokenName: 'BASED', tokenSymbol: 'BASED', allocation: 12, fees24h: 2100, volume24h: 84000, change7d: 5.6, contractAddress: '', isActive: true },
  { id: '6', tokenName: 'NORMIE', tokenSymbol: 'NORMIE', allocation: 10, fees24h: 1780, volume24h: 71000, change7d: -4.3, contractAddress: '', isActive: true },
  { id: '7', tokenName: 'DOGINME', tokenSymbol: 'DOGINME', allocation: 5, fees24h: 980, volume24h: 39000, change7d: 31.2, contractAddress: '', isActive: true },
  { id: '8', tokenName: 'KEYCAT', tokenSymbol: 'KEYCAT', allocation: 3, fees24h: 540, volume24h: 21000, change7d: -1.8, contractAddress: '', isActive: true },
];

export const FALLBACK_LEADERBOARD = [
  { id: '1', rank: 1, name: 'DEGEN', ticker: '$DEGEN', fees7d: 38400, volume7d: 1420000, holders: 12840, trend: 1, inFund: true, fundAllocation: 22, launchedAt: new Date(Date.now() - 21 * 86400000).toISOString() },
  { id: '2', rank: 2, name: 'BRETT', ticker: '$BRETT', fees7d: 31200, volume7d: 1180000, holders: 9620, trend: 1, inFund: true, fundAllocation: 18, launchedAt: new Date(Date.now() - 62 * 86400000).toISOString() },
  { id: '3', rank: 3, name: 'TOSHI', ticker: '$TOSHI', fees7d: 27800, volume7d: 980000, holders: 8100, trend: -1, inFund: true, fundAllocation: 16, launchedAt: new Date(Date.now() - 43 * 86400000).toISOString() },
  { id: '4', rank: 4, name: 'MFER', ticker: '$MFER', fees7d: 24100, volume7d: 870000, holders: 7200, trend: 1, inFund: true, fundAllocation: 14, launchedAt: new Date(Date.now() - 31 * 86400000).toISOString() },
  { id: '5', rank: 5, name: 'BASED', ticker: '$BASED', fees7d: 19800, volume7d: 720000, holders: 6400, trend: 0, inFund: true, fundAllocation: 12, launchedAt: new Date(Date.now() - 58 * 86400000).toISOString() },
  { id: '6', rank: 6, name: 'NORMIE', ticker: '$NORMIE', fees7d: 15600, volume7d: 580000, holders: 5100, trend: -1, inFund: true, fundAllocation: 10, launchedAt: new Date(Date.now() - 89 * 86400000).toISOString() },
  { id: '7', rank: 7, name: 'DOGINME', ticker: '$DOGINME', fees7d: 12400, volume7d: 410000, holders: 4300, trend: 1, inFund: true, fundAllocation: 5, launchedAt: new Date(Date.now() - 8 * 86400000).toISOString() },
  { id: '8', rank: 8, name: 'KEYCAT', ticker: '$KEYCAT', fees7d: 9800, volume7d: 320000, holders: 3600, trend: 0, inFund: true, fundAllocation: 3, launchedAt: new Date(Date.now() - 36 * 86400000).toISOString() },
  { id: '9', rank: 9, name: 'ZORA', ticker: '$ZORA', fees7d: 8200, volume7d: 270000, holders: 2900, trend: 1, inFund: false, fundAllocation: null, launchedAt: new Date(Date.now() - 27 * 86400000).toISOString() },
  { id: '10', rank: 10, name: 'CLANKER', ticker: '$CLANKER', fees7d: 6800, volume7d: 210000, holders: 2100, trend: 1, inFund: false, fundAllocation: null, launchedAt: new Date(Date.now() - 14 * 86400000).toISOString() },
];

export const FALLBACK_ACTIVITY = [
  { id: '1', type: 'rebalance', description: 'Increased DEGEN allocation from 18% → 22%', amount: null, createdAt: new Date(Date.now() - 2 * 3600000).toISOString() },
  { id: '2', type: 'fee', description: 'Collected $4,820 in fees from DEGEN position', amount: 4820, createdAt: new Date(Date.now() - 6 * 3600000).toISOString() },
  { id: '3', type: 'entry', description: 'Added DOGINME at 5% allocation', amount: null, createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: '4', type: 'burn', description: 'Burned 12,400 FHF tokens ($8,200 value)', amount: 8200, createdAt: new Date(Date.now() - 2 * 86400000).toISOString() },
  { id: '5', type: 'distribute', description: 'Distributed 0.82 ETH to stakers', amount: 0.82, createdAt: new Date(Date.now() - 3 * 86400000).toISOString() },
  { id: '6', type: 'rebalance', description: 'Reduced NORMIE allocation from 14% → 10%', amount: null, createdAt: new Date(Date.now() - 4 * 86400000).toISOString() },
];

export const FALLBACK_STAKING = {
  distributions: [
    { id: '1', totalEth: 0.82, totalUsd: 2460, stakersCount: 342, distributedAt: new Date(Date.now() - 3 * 86400000).toISOString() },
    { id: '2', totalEth: 0.74, totalUsd: 2220, stakersCount: 318, distributedAt: new Date(Date.now() - 10 * 86400000).toISOString() },
    { id: '3', totalEth: 0.91, totalUsd: 2730, stakersCount: 295, distributedAt: new Date(Date.now() - 17 * 86400000).toISOString() },
  ],
  totalStaked: 1680000,
  totalStakers: 342,
};
