import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const TIERLIST = await db.tierList.findMany({
      include: { tiers: { include: { characters: true } } },
      orderBy: [{ order: 'asc' }, { date_created: 'desc' }],
    })
    
    return NextResponse.json(TIERLIST, { status: 201 })
  } catch {
    return NextResponse.json('Internal Server Error', { status: 404 })
  }
}
