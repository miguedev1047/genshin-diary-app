'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { currentRole } from '@/data/auth'
import { TeamCharacters, TeamsCharacters } from '@prisma/client'
import { TeamNameSchema, TeamsCharacterSchema } from '@/schemas'

export async function updateTeam(
  data: z.infer<typeof TeamsCharacterSchema>,
  team_id: string
) {
  const ROLE = await currentRole()
  if (ROLE === 'USER') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = TeamsCharacterSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 403, message: 'Datos invalidos.' }
  }

  const { name, characters } = VALIDATE_FIELDS.data

  const TEAMS_CHARACTERS = characters.map((character, index) => ({
    team_id,
    character_id: character,
    order: index + 1,
  }))

  try {
    await db.teamCharacters.deleteMany({
      where: { team_id },
    })

    await db.teamCharacters.createMany({
      data: TEAMS_CHARACTERS,
    })

    await db.team.update({
      where: { id: team_id },
      data: { name },
    })

    return { status: 201, message: 'Cambios guardados.' }
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}

export async function updateOrderTeams(data: Array<TeamsCharacters>) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const ITEMS = data.map((item, index) => ({
    ...item,
    order: index++ + 1,
  }))

  try {
    ITEMS.forEach(async (item) => {
      return await db.team.update({
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

export async function updateOrderCharacters(data: Array<TeamCharacters>) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const ITEMS = data.map((item, index) => ({
    ...item,
    order: index++ + 1,
  }))

  try {
    ITEMS.forEach(async (item) => {
      return await db.teamCharacters.update({
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

export async function updateTeamName(
  data: z.infer<typeof TeamNameSchema>,
  id: string | undefined
) {
  if (!id) return { status: 403, message: 'Este equipo no existe.' }
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = TeamNameSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 403, message: 'Campos inválidos.' }
  }

  const { name } = VALIDATE_FIELDS.data

  try {
    await db.team.update({ where: { id }, data: { name } })

    return { status: 201, message: 'Cambios guardados.' }
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}

export async function updateCharacterConstellation(
  constellation: number,
  id: string | undefined
) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    await db.teamCharacters.update({
      where: { id },
      data: { constellation },
    })

    return { status: 201, message: 'Cambios guardados.' }
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
