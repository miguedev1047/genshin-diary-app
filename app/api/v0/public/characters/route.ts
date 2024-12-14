import { NextResponse } from 'next/server'
import { ElementEnum, RarityEnum, WeaponTypeEnum } from '@prisma/client'
import { cleanParam } from '@/features/helpers/clean-param'
import db from '@/lib/db'

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
        where: {
          ...(PARAMS.name && {
            name: { contains: PARAMS.name, mode: 'insensitive' },
          }),
          ...(PARAMS.element && {
            element: PARAMS.element as ElementEnum,
          }),
          ...(PARAMS.weapon && {
            weapon: PARAMS.weapon as WeaponTypeEnum,
          }),
          ...(PARAMS.star && {
            rarity: `STAR_${PARAMS.star}` as RarityEnum,
          }),
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
