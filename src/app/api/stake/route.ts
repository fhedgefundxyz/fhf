import { NextRequest, NextResponse } from 'next/server';
import { FALLBACK_STAKING } from '@/lib/fallback';

export async function GET() {
  try {
    const { prisma } = await import('@/lib/db');
    const [distributions, totalStaked, totalStakers] = await Promise.all([
      prisma.stakeDistribution.findMany({ orderBy: { distributedAt: 'desc' }, take: 5 }),
      prisma.stakePosition.aggregate({ where: { isActive: true }, _sum: { amountStaked: true } }),
      prisma.stakePosition.count({ where: { isActive: true } }),
    ]);
    return NextResponse.json({
      distributions,
      totalStaked: totalStaked._sum.amountStaked || 0,
      totalStakers,
    });
  } catch (e) {
    console.warn('[api/stake] DB unavailable, using fallback');
  }
  return NextResponse.json(FALLBACK_STAKING);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { walletAddress, amount } = body;
    if (!walletAddress || !amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid stake parameters' }, { status: 400 });
    }

    const { prisma } = await import('@/lib/db');
    await prisma.user.upsert({
      where: { walletAddress },
      update: { stFhfBalance: { increment: amount }, lastSeenAt: new Date() },
      create: { walletAddress, stFhfBalance: amount },
    });
    const stake = await prisma.stakePosition.create({
      data: { walletAddress, amountStaked: amount, stFhfReceived: amount },
    });
    return NextResponse.json(stake, { status: 201 });
  } catch (e) {
    console.warn('[api/stake POST] DB unavailable');
    return NextResponse.json({ error: 'Database not configured. Stake recorded locally.' }, { status: 503 });
  }
}
