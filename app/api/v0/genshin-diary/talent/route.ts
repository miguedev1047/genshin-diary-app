import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const TALENTS = await db.materials.findMany({
      orderBy: [{ date_created: 'asc' }, { rarity: 'desc' }, { name: 'asc' }],
      where: {
        OR: [
          { type: 'MATERIAL_TALENT' },
          { type: 'MATERIAL_COMMON' },
          { type: 'MATERIAL_WEEKLY_BOSS' },
        ],
      },
    })
    return NextResponse.json(TALENTS, { status: 201 })
  } catch {
    return new NextResponse('Internal Server Error', { status: 404 })
  }
}
