import { currentRole } from '@/data/auth'
import db from '@/lib/db'
import { ElementEnum, RarityEnum, WeaponTypeEnum } from '@prisma/client'

type Props = {
  name: string
  element: ElementEnum
  weapon: WeaponTypeEnum
  stars: RarityEnum | any
}

export async function getCharacters(props: Props) {
  const { name, element, weapon, stars } = props

  const ROLE = await currentRole()

  if (ROLE !== 'ADMIN') {
    return null
  }

  try {
    if (name || element || weapon || stars) {
      const CHARACTERS = await db.characters.findMany({
        where: {
          ...(name && { name: { contains: name, mode: 'insensitive' } }),
          ...(element && { element: element.toUpperCase() }),
          ...(weapon && { weapon: weapon.toUpperCase() }),
          ...(stars && { rarity: `STAR_${stars}` }),
        },
        orderBy: [{ rarity: 'asc' }, { name: 'asc' }, { date_created: 'desc' }],
        include: { images: true },
      })

      return CHARACTERS
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
