import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
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
