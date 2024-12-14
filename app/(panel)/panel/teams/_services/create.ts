'use server'

import { z } from 'zod'
import { TeamsCharacterSchema } from '@/schemas'
import { currentRole } from '@/data/auth'
import db from '@/lib/db'

export async function createTeam(data: z.infer<typeof TeamsCharacterSchema>) {
  const ROLE = await currentRole()

  if (ROLE !== 'ADMIN') {
    return { status: 401, message: 'No tienes permisos.' }
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
    }))

    await db.teamCharacters.createMany({
      data: TEAM_CHARACTERS,
      skipDuplicates: true,
    })

    return { status: 201, message: 'Equipo creado.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
