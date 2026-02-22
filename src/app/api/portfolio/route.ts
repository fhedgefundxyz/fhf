import { NextResponse } from 'next/server';
import { FALLBACK_PORTFOLIO } from '@/lib/fallback';

export async function GET() {
  try {
    const { prisma } = await import('@/lib/db');
    const holdings = await prisma.portfolioHolding.findMany({
      where: { isActive: true },
      orderBy: { allocation: 'desc' },
    });
    if (holdings.length > 0) return NextResponse.json(holdings);
  } catch (e) {
    console.warn('[api/portfolio] DB unavailable, using fallback');
  }
  return NextResponse.json(FALLBACK_PORTFOLIO);
}
