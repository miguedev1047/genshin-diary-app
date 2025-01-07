import { currentRole } from '@/data/auth'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const TEAM_ID = params.id
  
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
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
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 404 })
  }
}
