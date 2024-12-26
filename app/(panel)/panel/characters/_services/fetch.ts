import { currentRole } from '@/data/auth'
import { db } from '@/lib/db'

type Props = {
  name: string
  element: string
  weapon: string
  stars: string
}

export async function getCharacters(props: Props) {
  const { name, element, weapon, stars } = props

  const ROLE = await currentRole()
  if (ROLE === 'USER') return null
  
  try {
    if (name || element || weapon || stars) {
      const CHARACTERS = await db.characters.findMany({
        orderBy: [{ rarity: 'asc' }, { name: 'asc' }, { date_created: 'desc' }],
        include: { images: true },
      })

      const FILTERED_CHARACTERS = CHARACTERS.filter(
        (c) =>
          c.name.toLowerCase().includes(name.toLowerCase()) ||
          c.element.toLowerCase().includes(element.toLowerCase()) ||
          c.weapon.toLowerCase().includes(weapon.toLowerCase()) ||
          c.rarity.toLowerCase().includes(stars.toLowerCase())
      )

      return FILTERED_CHARACTERS
    }

    const CHARACTERS = await db.characters.findMany({
      orderBy: [{ rarity: 'asc' }, { name: 'asc' }, { date_created: 'desc' }],
      include: { images: true },
    })

    return CHARACTERS
  } catch (error) {
    return null
  }
}
