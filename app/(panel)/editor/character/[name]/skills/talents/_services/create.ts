'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { TalentCharacterSchema } from '@/schemas'
import db from '@/lib/db'

export async function createTalent(
  data: z.infer<typeof TalentCharacterSchema>
) {
  const ROLE = await currentRole()

  if (ROLE !== 'ADMIN') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = TalentCharacterSchema.safeParse(data)

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
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
