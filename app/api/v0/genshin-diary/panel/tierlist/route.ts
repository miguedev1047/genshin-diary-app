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
    const TIERLIST = await db.tierList.findMany({
      include: { tiers: { include: { characters: true } } },
      orderBy: [{ order: 'asc' }, { date_created: 'desc' }],
    })
    
    return NextResponse.json(TIERLIST, { status: 201 })
  } catch (error) {
    return NextResponse.json('Internal Server Error', { status: 404 })
  }
}
