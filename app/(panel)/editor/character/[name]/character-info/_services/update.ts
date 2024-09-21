'use server'

import { z } from 'zod'
import {
    AttributeEnum,
    ElementEnum,
    RarityEnum,
    RegionEnum,
    RoleEnum,
    WeaponTypeEnum,
} from '@prisma/client'
import { currentRole } from '@/data/auth'
import { CharacterSchema } from '@/schemas'
import db from '@/lib/db'

export async function updateCharacter(
  data: z.infer<typeof CharacterSchema>,
  character_id: string | undefined
) {
  const ROLE = await currentRole()

  if (ROLE !== 'ADMIN') {
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
    image_url,
    name,
    rarity,
    region,
    role,
    weapon,
  } = VALIDATE_FIELDS.data

  try {
    const CHARACTER_UPDATED = await db.characters.update({
      where: { id: character_id },
      data: {
        name,
        description,
        attribute: attribute as AttributeEnum,
        element: element as ElementEnum,
        rarity: rarity as RarityEnum,
        region: region as RegionEnum,
        role: role as RoleEnum,
        weapon: weapon as WeaponTypeEnum,
      },
    })

    await db.characterImage.update({
      where: { character_id: CHARACTER_UPDATED.id },
      data: {
        splash_art_url: image_url,
      },
    })

    return { status: 201, message: 'Cambios guardados.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
