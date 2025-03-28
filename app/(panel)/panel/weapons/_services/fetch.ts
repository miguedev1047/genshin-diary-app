import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'
import { Weapons } from '@prisma/client'

type Props = {
  name: string
  weapon: string
  stars: string
}

function filterWeapons(weapons: Array<Weapons>, filters: Props) {
  const { name, stars, weapon } = filters

  return weapons.filter((w) => {
    const matches = [
      name ? w.name.toLowerCase().includes(name.toLowerCase()) : true,
      weapon ? w.type.toLowerCase().includes(weapon.toLowerCase()) : true,
      stars ? w.rarity.endsWith(stars) : true,
    ]

    return matches.every(Boolean)
  })
}

export async function getWeapons(props: Props) {
  if (await isCurrentRole('USER')) {
    return null
  }

  try {
    const WEAPONS = await db.weapons.findMany({
      orderBy: [
        { rarity: 'desc' },
        { type: 'asc' },
        { name: 'asc' },
        { date_created: 'desc' },
      ],
    })

    const FILTERED_WEAPONS = filterWeapons(WEAPONS, { ...props })
    return FILTERED_WEAPONS
  } catch {
    return null
  }
}
