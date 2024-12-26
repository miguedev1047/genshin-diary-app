import { currentRole } from '@/data/auth'
import { formattedName } from '@/features/utils/formatted-names'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  const CHARACTER_NAME = formattedName(params.name)

  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const CHARACTER = await db.characters.findFirst({
      where: { name: { contains: CHARACTER_NAME } },
      include: { images: true },
    })

    return NextResponse.json(CHARACTER, { status: 201 })
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 404 })
  }
}
