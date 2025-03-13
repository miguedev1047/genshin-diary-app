import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const WEAPON = await db.weapons.findMany({
      orderBy: [{ rarity: 'asc' }, { name: 'asc' }, { date_created: 'desc' }],
      include: {
        ascensions: {
          orderBy: [{ order: 'asc' }],
          include: {
            materials: { orderBy: { date_created: 'asc' } },
          },
        },
        bests_characters: true,
      },
    })

    return NextResponse.json(WEAPON, { status: 201 })
  } catch {
    return new NextResponse('Internal Server Error', { status: 404 })
  }
}
