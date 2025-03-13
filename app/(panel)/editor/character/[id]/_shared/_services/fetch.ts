import { currentRole } from '@/data/auth'
import { db } from '@/lib/db'

export async function getCharacterById(id: string) {
  const CHARACTER_ID = id

  const ROLE = await currentRole()
  if (ROLE === 'USER') return null

  try {
    const CHARACTER = await db.characters.findUnique({
      where: {
        id: CHARACTER_ID,
      },
      include: {
        artifacts: {
          orderBy: { order: 'asc' },
          include: { artifact_set: { orderBy: { order: 'asc' } } },
        },
        ascensions: { orderBy: { level: 'asc' }, include: { materials: true } },
        images: true,
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
  } catch {
    return null
  }
}

export async function getCharacters() {
  const ROLE = await currentRole()
  if (ROLE === 'USER') return null

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
  const ROLE = await currentRole()
  if (ROLE === 'USER') return null

  try {
    const WEAPONS = await db.weapons.findMany()
    return WEAPONS
  } catch {
    return null
  }
}

export async function getArtifacts() {
  const ROLE = await currentRole()
  if (ROLE === 'USER') return null

  try {
    const ARTIFACTS = await db.artifacts.findMany()
    return ARTIFACTS
  } catch {
    return null
  }
}

export async function getMaterials() {
  const ROLE = await currentRole()
  if (ROLE === 'USER') return null

  try {
    const MATERIALS = await db.materials.findMany()
    return MATERIALS
  } catch {
    return null
  }
}
