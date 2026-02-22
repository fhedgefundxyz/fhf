import { NextResponse } from 'next/server';
import { FALLBACK_STATS } from '@/lib/fallback';

export async function GET() {
  try {
    const { prisma } = await import('@/lib/db');
    const stats = await prisma.fundStats.findUnique({ where: { id: 'singleton' } });
    if (stats) return NextResponse.json(stats);
  } catch (e) {
    console.warn('[api/stats] DB unavailable, using fallback');
  }
  return NextResponse.json(FALLBACK_STATS);
}
