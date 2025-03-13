import { db } from '@/lib/db'

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

export async function getTeams() {
  try {
    const TEAMS = await db.team.findMany({ include: { characters: true } })
    return TEAMS
  } catch {
    return null
  }
}

export async function getTierlists() {
  try {
    const TIERLIST = await db.tierList.findMany({
      include: { tiers: { include: { characters: true } } },
    })
    return TIERLIST
  } catch {
    return null
  }
}
