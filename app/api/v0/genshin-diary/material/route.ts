import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const MATERIALS = await db.materials.findMany({
      where: {
        OR: [
          { type: 'MATERIAL_UPGRADE' },
          { type: 'MATERIAL_LOCAL' },
          { type: 'MATERIAL_COMMON' },
          { type: 'MATERIAL_BOSS' },
          { type: 'MATERIAL_WEEKLY_BOSS' },
          { type: 'UPGRADE_MATERIAL' },
        ],
      },
    })
    return NextResponse.json(MATERIALS, { status: 201 })
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 404 })
  }
}
