import { NextResponse } from 'next/server'
import { cleanParam } from '@/features/helpers/clean-param'
import { db } from '@/lib/db'
import { Prisma } from '@prisma/client'
import { formattedName } from '@/features/utils/formatted-names'

export const dynamic = 'force-dynamic'

type Props = {
  name: string
  element: string
  weapon: string
  stars: string
}

type CharacterProps = Prisma.CharactersGetPayload<{ include: { images: true } }>

function filterCharacters(characters: Array<CharacterProps>, filters: Props) {
  const { element, name, weapon, stars } = filters

  const NAME = formattedName(name)!
  
  return characters.filter((c) => {
    const matches = [
      element ? c.element.toLowerCase().includes(element.toLowerCase()) : true,
      name ? c.name.toLowerCase().includes(NAME.toLowerCase()) : true,
      weapon ? c.weapon.toLowerCase().includes(weapon.toLowerCase()) : true,
      stars ? c.rarity.endsWith(stars) : true,
    ]

    return matches.every(Boolean)
  })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const PARAMS = {
    name: cleanParam(searchParams.get('name')),
    stars: cleanParam(searchParams.get('stars')),
    element: cleanParam(searchParams.get('element'))?.toUpperCase(),
    weapon: cleanParam(searchParams.get('weapon'))?.toUpperCase(),
  } as unknown as Props

  try {
    const CHARACTERS = await db.characters.findMany({
      orderBy: [{ rarity: 'asc' }, { name: 'asc' }, { date_created: 'desc' }],
      include: { images: true },
    })

    const FILTERED_CHARACTERS = filterCharacters(CHARACTERS, {
      name: PARAMS.name,
      stars: PARAMS.stars,
      element: PARAMS.element,
      weapon: PARAMS.weapon,
    })

    return NextResponse.json(FILTERED_CHARACTERS, { status: 201 })
  } catch (error) {
    console.log(error)
    return new NextResponse('Internal Error', { status: 501 })
  }
}
