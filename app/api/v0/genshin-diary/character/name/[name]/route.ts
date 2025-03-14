import { db } from '@/lib/db'
import { formattedName } from '@/features/utils/formatted-names'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  const CHARACTER_NAME = formattedName(params.name)

  try {
    const CHARACTER = await db.characters.findFirst({
      where: { name: { contains: CHARACTER_NAME } },
      include: { images: true },
    })

    return NextResponse.json(CHARACTER, { status: 201 })
  } catch {
    return new NextResponse('Internal Server Error', { status: 404 })
  }
}
