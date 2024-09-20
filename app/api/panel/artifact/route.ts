import { currentRole } from '@/data/auth'
import { NextResponse } from 'next/server'
import db from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const ROLE = await currentRole()

  if (ROLE !== 'ADMIN') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const ARTIFACTS = await db.artifacts.findMany()
    return NextResponse.json(ARTIFACTS, { status: 201 })
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 404 })
  }
}
