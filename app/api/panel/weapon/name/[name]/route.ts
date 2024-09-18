import { currentRole } from '@/data/auth'
import { formattedName } from '@/features/utils/formatted-names'
import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  const WEAPON_NAME = formattedName(params.name)

  const ROLE = await currentRole()

  if (ROLE !== 'ADMIN') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const WEAPON = await db.weapons.findFirst({
      where: { name: { contains: WEAPON_NAME, mode: 'insensitive' } },
      include: { ascensions: true, bests_characters: true },
    })

    return NextResponse.json(WEAPON, { status: 201 })
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 404 })
  }
}
