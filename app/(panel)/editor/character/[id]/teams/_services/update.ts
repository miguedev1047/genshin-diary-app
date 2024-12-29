'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { TeamsCharacter } from '@prisma/client'
import { TeamNameSchema } from '@/schemas'
import { db } from '@/lib/db'

export async function updateTeams(data: Array<TeamsCharacter>) {
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
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}

export async function updateTeamCharacters(data: Array<TeamsCharacter>) {
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
  } catch (error) {
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
    await db.teamsCharacter.update({ where: { id }, data: { name } })

    return { status: 201, message: 'Cambios guardados.' }
  } catch (error) {
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
    await db.teamsCharacters.update({
      where: { id },
      data: { constellation },
    })

    return { status: 201, message: 'Cambios guardados.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
