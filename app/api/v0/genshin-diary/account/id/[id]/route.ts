import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const ACCOUNT_ID = params.id

  if (await isCurrentRole('USER')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const ACCOUNT = await db.user.findUnique({
      select: {
        email: true,
        id: true,
        name: true,
        role: true,
      },
      where: { id: ACCOUNT_ID },
    })

    return NextResponse.json(ACCOUNT, { status: 201 })
  } catch {
    return new NextResponse('Internal Server Error', { status: 404 })
  }
}
