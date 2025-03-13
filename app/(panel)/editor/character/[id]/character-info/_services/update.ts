'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { CharacterSchema } from '@/schemas'
import { db } from '@/lib/db'

export async function updateCharacter(
  data: z.infer<typeof CharacterSchema>,
  character_id: string | undefined
) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = CharacterSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 403, message: 'Campos invalidos.' }
  }

  const {
    attribute,
    description,
    element,
    profile_image_url,
    splash_art_url,
    name,
    rarity,
    region,
    role,
    is_new,
    is_public,
    weapon,
  } = VALIDATE_FIELDS.data

  try {
    const CHARACTER_UPDATED = await db.characters.update({
      where: { id: character_id },
      data: {
        name,
        description,
        attribute,
        element,
        rarity,
        region,
        role,
        weapon,
        is_new,
        is_public,
      },
    })

    await db.characterImage.update({
      where: { character_id: CHARACTER_UPDATED.id },
      data: {
        profile_image_url,
        splash_art_url,
      },
    })

    return { status: 201, message: 'Cambios guardados.' }
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
