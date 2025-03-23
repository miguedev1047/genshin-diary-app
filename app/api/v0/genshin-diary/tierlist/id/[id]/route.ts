import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const TIERLIST_ID = params.id

  try {
    const TIERLIST = await db.tierList.findUnique({
      where: { id: TIERLIST_ID },
      include: { tiers: { include: { characters: true } } },
    })

    return NextResponse.json(TIERLIST, { status: 201 })
  } catch {
    return new NextResponse('Internal Server Error', { status: 404 })
  }
}
