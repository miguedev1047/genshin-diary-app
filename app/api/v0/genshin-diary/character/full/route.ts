import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const CHARACTERS = await db.characters.findMany({
      orderBy: [{ rarity: 'asc' }, { name: 'asc' }, { date_created: 'desc' }],
      include: {
        artifacts: {
          orderBy: { order: 'asc' },
          include: { artifact_set: { orderBy: { order: 'asc' } } },
        },
        ascensions: { orderBy: { level: 'asc' }, include: { materials: true } },
        images: true,
        stats_priority: true,
        video_guide: true,
        weapons: { orderBy: { order: 'asc' } },
        teams: {
          orderBy: { order: 'asc' },
          include: { characters: { orderBy: { order: 'asc' } } },
        },
        talents_ascension: {
          orderBy: { level: 'asc' },
          include: { materials: { orderBy: [{ date_created: 'asc' }] } },
        },
        talents: { orderBy: [{ order: 'asc' }, { date_created: 'asc' }] },
        passives: { orderBy: { order: 'asc' } },
        constellations: { orderBy: { order: 'asc' } },
        tierlist: { include: { tier_row: true } },
      },
    })

    return NextResponse.json(CHARACTERS, { status: 201 })
  } catch {
    return new NextResponse('Internal Server Error', { status: 404 })
  }
}
