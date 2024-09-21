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
        artifacts: true,
        ascensions: true,
        constellations: true,
        images: true,
        materials: true,
        passives: true,
        stats_priority: true,
        talents: true,
        video_guide: true,
        weapons: true,
      },
    })

    return CHARACTER
  } catch (error) {
    return null
  }
}
