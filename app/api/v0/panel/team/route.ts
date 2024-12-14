import { currentRole } from '@/data/auth'
import { NextResponse } from 'next/server'
import db from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const ROLE = await currentRole()

  if (ROLE !== 'ADMIN') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const TEAMS = await db.team.findMany({
      include: {
        characters: {
          orderBy: [{ order: 'asc' }, { date_created: 'desc' }],
        },
      },
      orderBy: [{ order: 'asc' }, { date_created: 'desc' }],
    })
    return NextResponse.json(TEAMS, { status: 201 })
  } catch (error) {
    return NextResponse.json('Internal Server Error', { status: 404 })
  }
}
