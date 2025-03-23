'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'
import { SkillCharacterSchema } from '@/schemas'

export async function createTalent(
  data: z.infer<typeof SkillCharacterSchema>
) {
  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = SkillCharacterSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 403, message: 'Campos invalidos.' }
  }

  const { title, description, type, image_url, character_id } =
    VALIDATE_FIELDS.data

  try {
    await db.talentsCharacter.create({
      data: {
        character_id,
        title,
        description,
        type,
        image_url,
      },
    })

    return { status: 201, message: 'Talento agregado.' }
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
