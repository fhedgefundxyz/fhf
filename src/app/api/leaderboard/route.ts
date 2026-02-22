import { NextRequest, NextResponse } from 'next/server';
import { FALLBACK_LEADERBOARD } from '@/lib/fallback';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sortBy = searchParams.get('sort') || 'fees7d';

  try {
    const { prisma } = await import('@/lib/db');
    const validSorts: Record<string, object> = {
      fees7d: { fees7d: 'desc' as const },
      volume7d: { volume7d: 'desc' as const },
      holders: { holders: 'desc' as const },
    };
    const projects = await prisma.flaunchProject.findMany({
      orderBy: validSorts[sortBy] || { fees7d: 'desc' },
    });
    if (projects.length > 0) return NextResponse.json(projects);
  } catch (e) {
    console.warn('[api/leaderboard] DB unavailable, using fallback');
  }

  // Sort fallback data
  const sortKey = sortBy === 'volume7d' ? 'volume7d' : sortBy === 'holders' ? 'holders' : 'fees7d';
  const sorted = [...FALLBACK_LEADERBOARD].sort((a, b) => (b as any)[sortKey] - (a as any)[sortKey]);
  return NextResponse.json(sorted);
}
