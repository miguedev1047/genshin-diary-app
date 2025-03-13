'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { SkillCharacterSchema } from '@/schemas'
import { TalentsCharacter } from '@prisma/client'
import { db } from '@/lib/db'

export async function updateTalent(
  data: z.infer<typeof SkillCharacterSchema>,
  talent_id: string
) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = SkillCharacterSchema.safeParse(data)
  if (!VALIDATE_FIELDS.success) {
    return { status: 403, message: 'Campos invalidos.' }
  }

  const { title, description, image_url, type } = VALIDATE_FIELDS.data

  try {
    await db.talentsCharacter.update({
      where: { id: talent_id },
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

export async function updateTalentOrder(data: Array<TalentsCharacter>) {
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
      return await db.talentsCharacter.update({
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
