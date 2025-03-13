import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const MATERIAL_ID = params.id

  try {
    const TALENTS = await db.materials.findUnique({
      where: { id: MATERIAL_ID },
    })

    return NextResponse.json(TALENTS, { status: 201 })
  } catch {
    return new NextResponse('Internal Server Error', { status: 404 })
  }
}
