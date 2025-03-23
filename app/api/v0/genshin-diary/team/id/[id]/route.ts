import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const TEAM_ID = params.id
  
  if (await isCurrentRole('USER')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const TEAM = await db.team.findUnique({
      where: { id: TEAM_ID },
      include: {
        characters: {
          orderBy: [{ order: 'asc' }, { date_created: 'desc' }],
        },
      },
    })

    return NextResponse.json(TEAM, { status: 201 })
  } catch {
    return new NextResponse('Internal Server Error', { status: 404 })
  }
}
