'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'
import { SkillCharacterSchema } from '@/schemas'
import { ConstellationsCharacter } from '@prisma/client'

export async function updateConstellation(
  data: z.infer<typeof SkillCharacterSchema>,
  constellation_id: string
) {
  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = SkillCharacterSchema.safeParse(data)
  if (!VALIDATE_FIELDS.success) {
    return { status: 403, message: 'Campos invalidos.' }
  }

  const { title, description, image_url, type } = VALIDATE_FIELDS.data

  try {
    await db.constellationsCharacter.update({
      where: { id: constellation_id },
      data: {
        title,
        description,
        image_url,
        type,
      },
    })

    return { status: 201, message: 'Cambios guardados.' }
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}

export async function updateConstellationOrder(
  data: Array<ConstellationsCharacter>
) {
  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const ITEMS = data.map((item, index) => ({
    ...item,
    order: index++ + 1,
  }))

  try {
    ITEMS.forEach(async (item) => {
      return await db.constellationsCharacter.update({
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
