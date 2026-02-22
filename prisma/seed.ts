import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Fund Stats
  await prisma.fundStats.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      tvl: 2480000,
      totalFees: 184200,
      apy: 34.2,
      holders: 1847,
      weeklyReturn: 4.8,
      monthlyReturn: 18.6,
      treasuryAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f8B3Fc2',
    },
  });

  // Portfolio Holdings
  const holdings = [
    { tokenName: 'DEGEN', tokenSymbol: 'DEGEN', allocation: 22, fees24h: 4820, volume24h: 182000, change7d: 14.2 },
    { tokenName: 'BRETT', tokenSymbol: 'BRETT', allocation: 18, fees24h: 3910, volume24h: 156000, change7d: 8.7 },
    { tokenName: 'TOSHI', tokenSymbol: 'TOSHI', allocation: 16, fees24h: 3200, volume24h: 128000, change7d: -2.1 },
    { tokenName: 'MFER', tokenSymbol: 'MFER', allocation: 14, fees24h: 2870, volume24h: 98000, change7d: 22.4 },
    { tokenName: 'BASED', tokenSymbol: 'BASED', allocation: 12, fees24h: 2100, volume24h: 84000, change7d: 5.6 },
    { tokenName: 'NORMIE', tokenSymbol: 'NORMIE', allocation: 10, fees24h: 1780, volume24h: 71000, change7d: -4.3 },
    { tokenName: 'DOGINME', tokenSymbol: 'DOGINME', allocation: 5, fees24h: 980, volume24h: 39000, change7d: 31.2 },
    { tokenName: 'KEYCAT', tokenSymbol: 'KEYCAT', allocation: 3, fees24h: 540, volume24h: 21000, change7d: -1.8 },
  ];

  await prisma.portfolioHolding.deleteMany();
  for (const h of holdings) {
    await prisma.portfolioHolding.create({ data: h });
  }

  // Flaunch Projects (Leaderboard)
  const projects = [
    { rank: 1, name: 'DEGEN', ticker: '$DEGEN', fees7d: 38400, volume7d: 1420000, holders: 12840, trend: 1, inFund: true, fundAllocation: 22 },
    { rank: 2, name: 'BRETT', ticker: '$BRETT', fees7d: 31200, volume7d: 1180000, holders: 9620, trend: 1, inFund: true, fundAllocation: 18 },
    { rank: 3, name: 'TOSHI', ticker: '$TOSHI', fees7d: 27800, volume7d: 980000, holders: 8100, trend: -1, inFund: true, fundAllocation: 16 },
    { rank: 4, name: 'MFER', ticker: '$MFER', fees7d: 24100, volume7d: 870000, holders: 7200, trend: 1, inFund: true, fundAllocation: 14 },
    { rank: 5, name: 'BASED', ticker: '$BASED', fees7d: 19800, volume7d: 720000, holders: 6400, trend: 0, inFund: true, fundAllocation: 12 },
    { rank: 6, name: 'NORMIE', ticker: '$NORMIE', fees7d: 15600, volume7d: 580000, holders: 5100, trend: -1, inFund: true, fundAllocation: 10 },
    { rank: 7, name: 'DOGINME', ticker: '$DOGINME', fees7d: 12400, volume7d: 410000, holders: 4300, trend: 1, inFund: true, fundAllocation: 5 },
    { rank: 8, name: 'KEYCAT', ticker: '$KEYCAT', fees7d: 9800, volume7d: 320000, holders: 3600, trend: 0, inFund: true, fundAllocation: 3 },
    { rank: 9, name: 'ZORA', ticker: '$ZORA', fees7d: 8200, volume7d: 270000, holders: 2900, trend: 1, inFund: false },
    { rank: 10, name: 'CLANKER', ticker: '$CLANKER', fees7d: 6800, volume7d: 210000, holders: 2100, trend: 1, inFund: false },
  ];

  await prisma.flaunchProject.deleteMany();
  for (const p of projects) {
    await prisma.flaunchProject.create({ data: p });
  }

  // Fund Activity
  const activities = [
    { type: 'rebalance', description: 'Increased DEGEN allocation from 18% → 22%' },
    { type: 'fee', description: 'Collected $4,820 in fees from DEGEN position', amount: 4820 },
    { type: 'entry', description: 'Added DOGINME at 5% allocation' },
    { type: 'burn', description: 'Burned 12,400 FHF tokens ($8,200 value)', amount: 8200 },
    { type: 'distribute', description: 'Distributed 0.82 ETH to stakers', amount: 0.82 },
    { type: 'rebalance', description: 'Reduced NORMIE allocation from 14% → 10%' },
  ];

  await prisma.fundActivity.deleteMany();
  for (const a of activities) {
    await prisma.fundActivity.create({ data: a });
  }

  // Stake Distributions
  await prisma.stakeDistribution.deleteMany();
  const distributions = [
    { totalEth: 0.82, totalUsd: 2460, stakersCount: 342 },
    { totalEth: 0.74, totalUsd: 2220, stakersCount: 318 },
    { totalEth: 0.91, totalUsd: 2730, stakersCount: 295 },
  ];
  for (const d of distributions) {
    await prisma.stakeDistribution.create({ data: d });
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
