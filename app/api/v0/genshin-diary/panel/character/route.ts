import { currentRole } from '@/data/auth'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const CHARACTERS = await db.characters.findMany({
      orderBy: [{ rarity: 'asc' }, { name: 'asc' }, { date_created: 'desc' }],
      include: { images: true },
    })

    return NextResponse.json(CHARACTERS, { status: 201 })
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 404 })
  }
}
