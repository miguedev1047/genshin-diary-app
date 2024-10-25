'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { SkillCharacterSchema } from '@/schemas'
import db from '@/lib/db'

export async function createConstellation(
  data: z.infer<typeof SkillCharacterSchema>
) {
  const ROLE = await currentRole()

  if (ROLE !== 'ADMIN') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = SkillCharacterSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 403, message: 'Campos invalidos.' }
  }

  const { title, description, type, image_url, character_id } =
    VALIDATE_FIELDS.data

  try {
    await db.constellationsCharacter.create({
      data: {
        character_id,
        title,
        description,
        type,
        image_url,
      },
    })

    return { status: 201, message: 'Constelación agregada.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
