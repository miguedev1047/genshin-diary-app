'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { CharacterSchema } from '@/schemas'
import { db } from '@/lib/db'
import { getCharacter } from '@/app/(panel)/creator/character/_services/fetch'
import { revalidatePath } from 'next/cache'

export const createCharacter = async (
  data: z.infer<typeof CharacterSchema>
) => {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = CharacterSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 400, message: 'Campos invalidos.' }
  }

  const {
    name,
    profile_image_url,
    splash_art_url,
    description,
    role,
    element,
    rarity,
    attribute,
    region,
    weapon,
  } = VALIDATE_FIELDS.data

  const EXISTS_CHARACTER = await getCharacter(name)

  if (EXISTS_CHARACTER) {
    return { status: 500, message: 'Este personaje ya existe!' }
  }

  try {
    const CHARACTER = await db.characters.create({
      data: {
        name,
        description,
        role,
        element,
        rarity,
        attribute,
        region,
        weapon,
      },
    })

    await db.characterImage.create({
      data: {
        character_id: CHARACTER.id,
        splash_art_url,
        profile_image_url,
      },
    })

    revalidatePath('/characters')
    return { status: 201, message: 'Personaje creado.' }
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
