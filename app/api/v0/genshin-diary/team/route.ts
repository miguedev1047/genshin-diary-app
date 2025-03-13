import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const TEAMS = await db.team.findMany({
      include: {
        characters: { orderBy: [{ order: 'asc' }, { date_created: 'desc' }] },
      },
      orderBy: [{ order: 'asc' }, { date_created: 'desc' }],
    })
    return NextResponse.json(TEAMS, { status: 201 })
  } catch {
    return NextResponse.json('Internal Server Error', { status: 404 })
  }
}
