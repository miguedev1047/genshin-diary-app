'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { TeamsCharacterSchema } from '@/schemas'
import { isCurrentRole } from '@/data/auth'

export async function createTeam(data: z.infer<typeof TeamsCharacterSchema>) {
  if (await isCurrentRole('USER')) {
      return { status: 403, message: 'No tienes permisos.' }
    }

  const VALIDATE_FIELDS = TeamsCharacterSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 400, message: 'Campos invalidos.' }
  }

  const { name, characters } = VALIDATE_FIELDS.data

  try {
    const TEAMS = await db.team.create({
      data: {
        name,
      },
    })

    const TEAM_CHARACTERS = characters.map((character) => ({
      team_id: TEAMS.id,
      character_id: character,
      id: crypto.randomUUID(),
    }))

    await db.teamCharacters.createMany({
      data: TEAM_CHARACTERS,
    })

    return { status: 201, message: 'Equipo creado.' }
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
