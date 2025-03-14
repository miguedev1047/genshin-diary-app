'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'
import { TeamsCharacterSchema } from '@/schemas'

export async function createTeams(
  data: z.infer<typeof TeamsCharacterSchema>,
  character_id: string | undefined
) {
  if (!character_id) {
    return { status: 403, message: 'Este personaje no existe.' }
  }

  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = TeamsCharacterSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 400, message: 'Campos invalidos.' }
  }

  const { name, characters } = VALIDATE_FIELDS.data

  const CHARACTERS = characters.map((character, index) => ({
    character_id: character,
    order: index + +1,
  }))

  try {
    await db.teamsCharacter.create({
      data: {
        name,
        character_id,
        characters: { createMany: { data: CHARACTERS } },
      },
    })

    return { status: 201, message: 'Equipo creado.' }
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
