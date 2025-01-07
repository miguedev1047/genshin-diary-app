import { db } from '@/lib/db'
import { CharacterProps } from '../_types'

type Props = {
  name: string
  element: string
  weapon: string
  stars: string
}

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
  try {
    const CHARACTERS = await db.characters.findMany({
      where: { is_public: true },
      orderBy: [{ rarity: 'desc' }, { name: 'asc' }, { date_created: 'desc' }],
      include: { images: true },
    })

    const FILTERED_CHARACTERS = filterCharacters(CHARACTERS, { ...props })

    return FILTERED_CHARACTERS
  } catch (error) {
    return null
  }
}
