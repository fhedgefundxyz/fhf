import { NextResponse } from 'next/server';
import { FALLBACK_ACTIVITY } from '@/lib/fallback';

export async function GET() {
  try {
    const { prisma } = await import('@/lib/db');
    const activities = await prisma.fundActivity.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    if (activities.length > 0) return NextResponse.json(activities);
  } catch (e) {
    console.warn('[api/activity] DB unavailable, using fallback');
  }
  return NextResponse.json(FALLBACK_ACTIVITY);
}
