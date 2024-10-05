import { currentRole } from '@/data/auth'
import { ElementEnum, RarityEnum, WeaponTypeEnum } from '@prisma/client'
import db from '@/lib/db'

type Props = {
  name: string
  element: ElementEnum
  weapon: WeaponTypeEnum
  stars: RarityEnum
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
          ...(element && { element: element.toUpperCase() as ElementEnum }),
          ...(weapon && { weapon: weapon.toUpperCase() as WeaponTypeEnum }),
          ...(stars && { rarity: `STAR_${stars}` as RarityEnum }),
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
