import { getPlayerData } from '@/features/utils/get-player-data'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { uid: string } }
) {
  const PLAYER_ID = params.uid

  try {
    const DATA = await getPlayerData(PLAYER_ID)

    if (DATA?.infoUser.characters.length === 0) {
      return NextResponse.json(
        null,
        { status: 404 }
      )
    }

    if (!DATA) {
      return NextResponse.json(
        null,
        { status: 404 }
      )
    }

    return NextResponse.json(DATA, { status: 201 })
  } catch {
    return NextResponse.json({ message: 'Player not found' }, { status: 404 })
  }
}
