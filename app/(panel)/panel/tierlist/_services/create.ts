'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { TierlistSchema } from '@/schemas'
import { db } from '@/lib/db'

const TIERS = [
  { tier_rank: 'D' },
  { tier_rank: 'C' },
  { tier_rank: 'B' },
  { tier_rank: 'A' },
  { tier_rank: 'S' },
]

export async function createTierlist(data: z.infer<typeof TierlistSchema>) {
  const ROLE = await currentRole()
  if (ROLE === 'USER') {
    return { status: 401, message: 'No tienes permisos' }
  }

  const VALIDATE_FIELDS = TierlistSchema.safeParse(data)
  if (!VALIDATE_FIELDS.success) {
    return { status: 401, message: 'No tienes permisos' }
  }

  const { tier_category } = VALIDATE_FIELDS.data

  try {
    await db.tierList.create({
      data: {
        tier_category,
        tiers: {
          createMany: {
            data: TIERS,
          },
        },
      },
    })

    return { status: 201, message: 'Tierlist creada!' }
  } catch (error) {
    return { status: 500, message: 'Ha ocurrido un error.' }
  }
}

export async function createTierCharacter(
  data: {
    characters: string[]
  },
  tier_id: string
) {
  const ROLE = await currentRole()
  if (ROLE === 'USER') {
    return { status: 401, message: 'No tienes permisos' }
  }

  const CHARACTERS = data.characters.map((character) => ({
    tier_id,
    character_id: character,
  }))

  try {
    await db.tierCharacter.createMany({
      data: CHARACTERS,
    })

    return { status: 201, message: 'Personaje agregado!' }
  } catch (error) {
    return { status: 500, message: 'Ha ocurrido un error.' }
  }
}
