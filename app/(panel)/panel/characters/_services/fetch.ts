import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'
import { Prisma } from '@prisma/client'

type Props = {
  name: string
  element: string
  weapon: string
  stars: string
}

type CharacterProps = Prisma.CharactersGetPayload<{ include: { images: true } }>

function filterCharacters(characters: Array<CharacterProps>, filters: Props) {
  const { element, name, weapon, stars } = filters

  return characters.filter((c) => {
    const matches = [
      element ? c.element.toLowerCase().includes(element.toLowerCase()) : true,
      name ? c.name.toLowerCase().includes(name.toLowerCase()) : true,
      weapon ? c.weapon.toLowerCase().includes(weapon.toLowerCase()) : true,
      stars ? c.rarity.endsWith(stars) : true,
    ]

    return matches.every(Boolean)
  })
}

export async function getCharacters(props: Props) {
  if (await isCurrentRole('USER')) {
    return null
  }

  try {
    const CHARACTERS = await db.characters.findMany({
      orderBy: [{ rarity: 'desc' }, { name: 'asc' }, { date_created: 'desc' }],
      include: { images: true },
    })

    const FILTERED_CHARACTERS = filterCharacters(CHARACTERS, { ...props })
    return FILTERED_CHARACTERS
    
  } catch {
    return null
  }
}
