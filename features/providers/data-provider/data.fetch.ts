import { db } from '@/lib/db'

export async function getCharacters() {
  try {
    const CHARACTERS = await db.characters.findMany({
      include: { images: true },
    })
    return CHARACTERS
  } catch (error) {
    return null
  }
}

export async function getWeapons() {
  try {
    const WEAPONS = await db.weapons.findMany()
    return WEAPONS
  } catch (error) {
    return null
  }
}

export async function getArtifacts() {
  try {
    const ARTIFACTS = await db.artifacts.findMany()
    return ARTIFACTS
  } catch (error) {
    return null
  }
}

export async function getMaterials() {
  try {
    const MATERIALS = await db.materials.findMany()
    return MATERIALS
  } catch (error) {
    return null
  }
}
