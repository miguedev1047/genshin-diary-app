import { currentRole } from '@/data/auth'
import { db } from '@/lib/db'

export async function getCharacterByName(name: string) {
  const CHARACTER_NAME = name.toLowerCase()

  const ROLE = await currentRole()
  if (ROLE === 'USER') return null

  try {
    const CHARACTER = await db.characters.findFirst({
      where: {
        name: { contains: CHARACTER_NAME },
      },
      include: {
        artifacts: { orderBy: { order: 'asc' } },
        ascensions: { orderBy: { level: 'asc' }, include: { materials: true } },
        images: true,
        materials: true,
        stats_priority: true,
        video_guide: true,
        weapons: { orderBy: { order: 'asc' } },
        teams: {
          orderBy: { order: 'asc' },
          include: { characters: { orderBy: { order: 'asc' } } },
        },
        talents_ascension: {
          orderBy: { level: 'asc' },
          include: { materials: { orderBy: [{ date_created: 'asc' }] } },
        },
        talents: { orderBy: [{ order: 'asc' }, { date_created: 'asc' }] },
        passives: { orderBy: { order: 'asc' } },
        constellations: { orderBy: { order: 'asc' } },
      },
    })

    return CHARACTER
  } catch (error) {
    return null
  }
}
