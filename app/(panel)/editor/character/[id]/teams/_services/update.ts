'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'
import { TeamsCharacter } from '@prisma/client'
import { TeamsCharacterSchema } from '@/schemas'

export async function updateTeamsOrder(data: Array<TeamsCharacter>) {
  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const ITEMS = data.map((item, index) => ({
    ...item,
    order: index++ + 1,
  }))

  try {
    ITEMS.forEach(async (item) => {
      return await db.teamsCharacter.update({
        where: {
          id: item.id,
        },
        data: {
          order: item.order,
        },
      })
    })

    return { status: 201, message: 'Cambios guardados.' }
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}

export async function updateTeamsCharacters(
  data: z.infer<typeof TeamsCharacterSchema>,
  team_id: string
) {
  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = TeamsCharacterSchema.safeParse(data)
  if (!VALIDATE_FIELDS.success) {
    return { status: 403, message: 'Datos invalidos.' }
  }

  const { name, characters } = VALIDATE_FIELDS.data

  const TEAMS_CHARACTERS = characters.map((character, index) => ({
    character_id: character,
    team_id,
    order: index + 1,
  }))

  try {
    await db.teamsCharacters.deleteMany({
      where: { team_id },
    })

    await db.teamsCharacters.createMany({
      data: TEAMS_CHARACTERS,
    })

    await db.teamsCharacter.update({
      where: { id: team_id },
      data: { name },
    })

    return { status: 201, message: 'Cambios guardados.' }
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}

export async function updateTeamCharactersOrder(data: Array<TeamsCharacter>) {
  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const ITEMS = data.map((item, index) => ({
    ...item,
    order: index++ + 1,
  }))

  try {
    ITEMS.forEach(async (item) => {
      return await db.teamsCharacters.update({
        where: {
          id: item.id,
        },
        data: {
          order: item.order,
        },
      })
    })

    return { status: 201, message: 'Cambios guardados.' }
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}

export async function updateCharacterConstellation(
  constellation: number,
  id: string | undefined
) {
  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    await db.teamsCharacters.update({
      where: { id },
      data: { constellation },
    })

    return { status: 201, message: 'Cambios guardados.' }
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
