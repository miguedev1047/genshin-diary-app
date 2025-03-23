'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'
import { CharacterSelectorSchema } from '@/schemas'

export async function createBestCharacters(
  data: z.infer<typeof CharacterSelectorSchema>,
  weapon_id: string | undefined
) {
  if (!weapon_id) return { status: 403, message: 'Esta arma no existe.' }

  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = CharacterSelectorSchema.safeParse(data)
  if (!VALIDATE_FIELDS.success) {
    return { status: 403, message: 'Campos invalidos.' }
  }

  const { characters } = VALIDATE_FIELDS.data

  const BEST_CHARACTERS = characters.map((character) => ({
    weapon_id,
    character_id: character,
    id: crypto.randomUUID()
  }))

  try {
    await db.weaponBestCharacters.createMany({
      data: BEST_CHARACTERS,
    })

    return { status: 201, message: 'Personaje agregado.' }
  } catch {
    return { status: 403, message: 'Ocurrio un error.' }
  }
}
