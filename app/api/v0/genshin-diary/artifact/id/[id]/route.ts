import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const ARTIFACT_ID = params.id

  try {
    const ARTIFACT = await db.artifacts.findUnique({
      where: { id: ARTIFACT_ID },
    })

    return NextResponse.json(ARTIFACT, { status: 201 })
  } catch {
    return new NextResponse('Internal Server Error', { status: 404 })
  }
}
