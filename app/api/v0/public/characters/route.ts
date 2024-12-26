import { NextResponse } from 'next/server'
import { cleanParam } from '@/features/helpers/clean-param'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const PARAMS = {
    name: cleanParam(searchParams.get('name')),
    star: cleanParam(searchParams.get('star')),
    element: cleanParam(searchParams.get('element'))?.toUpperCase(),
    weapon: cleanParam(searchParams.get('weapon'))?.toUpperCase(),
  }

  try {
    if (PARAMS.name || PARAMS.element || PARAMS.weapon || PARAMS.star) {
      const CHARACTERS = await db.characters.findMany({
        orderBy: [
          {
            rarity: 'asc',
          },
          {
            name: 'asc',
          },
          {
            date_created: 'desc',
          },
        ],
        include: {
          images: true,
        },
      })

      const FILTERED_CHARACTERS = CHARACTERS.filter(
        (c) =>
          c.name.toLowerCase().includes(PARAMS.name?.toLowerCase() ?? '') ||
          c.element.toLowerCase().includes(PARAMS.element?.toLowerCase() ?? '') ||
          c.weapon.toLowerCase().includes(PARAMS.weapon?.toLowerCase() ?? '') ||
          c.rarity.toLowerCase().includes(PARAMS.star?.toLowerCase() ?? '')
      )

      return NextResponse.json(FILTERED_CHARACTERS, { status: 201 })
    }

    const CHARACTERS = await db.characters.findMany({
      where: {
        is_public: false, // INFO: Mostramos el personaje si es publico
      },
      orderBy: [
        {
          rarity: 'asc',
        },
        {
          name: 'asc',
        },
        {
          date_created: 'desc',
        },
      ],
      include: {
        images: true,
      },
    })

    return NextResponse.json(CHARACTERS, { status: 201 })
  } catch (error) {
    return new NextResponse('Internal Error', { status: 501 })
  }
}
