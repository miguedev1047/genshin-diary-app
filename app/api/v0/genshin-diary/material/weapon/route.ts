import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const MATERIALS = await db.materials.findMany({
      orderBy: [{ date_created: 'asc' }, { rarity: 'desc' }, { name: 'asc' }],
      where: {
        OR: [{ type: 'WEAPON_MATERIAL' }, { type: 'MATERIAL_COMMON' }],
      },
    })
    return NextResponse.json(MATERIALS, { status: 201 })
  } catch {
    return new NextResponse('Internal Server Error', { status: 404 })
  }
}
