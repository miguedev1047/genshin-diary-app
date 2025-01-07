import { db } from '@/lib/db'

export async function getCharacters(character_id: string) {
  try {
    const CHARACTERS = await db.characters.findUnique({
      where: { id: character_id },
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

    return CHARACTERS
  } catch (error) {
    return null
  }
}
