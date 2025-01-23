import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const TALENTS = await db.materials.findMany({
      where: {
        OR: [
          { type: 'MATERIAL_TALENT' },
          { type: 'MATERIAL_COMMON' },
          { type: 'MATERIAL_WEEKLY_BOSS' },
        ],
      },
    })
    return NextResponse.json(TALENTS, { status: 201 })
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 404 })
  }
}
