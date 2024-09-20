import { currentRole } from '@/data/auth'
import { NextResponse } from 'next/server'
import db from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const ARTIFACT_ID = params.id

  const ROLE = await currentRole()

  if (ROLE !== 'ADMIN') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const ARTIFACT = await db.artifacts.findUnique({
      where: { id: ARTIFACT_ID },
    })

    return NextResponse.json(ARTIFACT, { status: 201 })
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 404 })
  }
}
