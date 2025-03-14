import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (await isCurrentRole('USER')) {
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
  } catch {
    return NextResponse.json('Internal Server Error', { status: 404 })
  }
}
