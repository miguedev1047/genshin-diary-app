import { formattedName } from '@/features/utils/formatted-names'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  const WEAPON_NAME = formattedName(params.name)

  try {
    const WEAPON = await db.weapons.findFirst({
      where: { name: { contains: WEAPON_NAME } },
      include: {
        ascensions: {
          orderBy: [{ order: 'asc' }],
          include: {
            materials: { orderBy: { date_created: 'asc' } },
          },
        },
        bests_characters: true,
      },
    })

    if (!WEAPON) {
      return new NextResponse('Internal Server Error', { status: 404 })
    }

    return NextResponse.json(WEAPON, { status: 201 })
  } catch {
    return new NextResponse('Internal Server Error', { status: 404 })
  }
}
