import { currentRole } from '@/data/auth'
import db from '@/lib/db'

export async function getCharacterByName(character_name: string) {
  const CHARACTER_NAME = character_name.toLowerCase()

  const ROLE = await currentRole()
  if (ROLE !== 'ADMIN') return null

  try {
    const CHARACTER = await db.characters.findFirst({
      where: {
        name: { contains: CHARACTER_NAME, mode: 'insensitive' },
      },
      include: {
        artifacts: { orderBy: { order: 'asc' } },
        ascensions: { orderBy: { level: 'asc' }, include: { materials: true } },
        images: true,
        materials: true,
        passives: true,
        stats_priority: true,
        constellations: true,
        video_guide: true,
        weapons: { orderBy: { order: 'asc' } },
        teams: {
          orderBy: { order: 'asc' },
          include: { characters: { orderBy: { order: 'asc' } } },
        },
        talents: {
          orderBy: { level: 'asc' },
          include: { materials: { orderBy: [{ date_created: 'asc' }] } },
        },
      },
    })

    return CHARACTER
  } catch (error) {
    return null
  }
}
