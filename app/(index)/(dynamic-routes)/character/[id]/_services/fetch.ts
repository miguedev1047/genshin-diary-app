import { db } from '@/lib/db'

export async function getCharacterById(character_id: string) {
  try {
    const CHARACTERS = await db.characters.findUnique({
      where: { id: character_id },
      include: {
        artifacts: {
          orderBy: { order: 'asc' },
          include: { artifact_set: { orderBy: { order: 'asc' } } },
        },
        ascensions: { orderBy: { level: 'asc' }, include: { materials: true } },
        stats_priority: true,
        video_guide: true,
        images: true,
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
  } catch {
    return null
  }
}

export async function getCharacters() {
  try {
    const CHARACTERS = await db.characters.findMany({
      include: { images: true },
    })
    return CHARACTERS
  } catch {
    return null
  }
}

export async function getWeapons() {
  try {
    const WEAPONS = await db.weapons.findMany()
    return WEAPONS
  } catch {
    return null
  }
}

export async function getArtifacts() {
  try {
    const ARTIFACTS = await db.artifacts.findMany()
    return ARTIFACTS
  } catch {
    return null
  }
}

export async function getMaterials() {
  try {
    const MATERIALS = await db.materials.findMany()
    return MATERIALS
  } catch {
    return null
  }
}
