import { currentRole } from '@/data/auth'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const CHARACTER_ID = params.id

  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const CHARACTER = await db.characters.findUnique({
      where: { id: CHARACTER_ID },
      include: { images: true },
    })

    return NextResponse.json(CHARACTER, { status: 201 })
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 404 })
  }
}
