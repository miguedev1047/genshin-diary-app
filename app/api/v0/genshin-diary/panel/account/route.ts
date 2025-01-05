import { currentRole } from '@/data/auth'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const ACCOUNTS = await db.user.findMany({
      select: {
        email: true,
        id: true,
        name: true,
        role: true,
      },
      orderBy: { name: 'asc' },
    })
    return NextResponse.json(ACCOUNTS, { status: 201 })
  } catch (error) {
    return NextResponse.json('Internal Server Error', { status: 404 })
  }
}
