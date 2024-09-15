'use server'

import {
    AttributeEnum,
    ElementEnum,
    RarityEnum,
    RegionEnum,
    RoleEnum,
    WeaponTypeEnum,
} from '@prisma/client'
import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { CharacterSchema } from '@/schemas'
import db from '@/lib/db'

export const createCharacter = async (
  data: z.infer<typeof CharacterSchema>
) => {
  const ROLE = await currentRole()

  if (ROLE !== 'ADMIN') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = CharacterSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 400, message: 'Campos invalidos.' }
  }

  const {
    name,
    image_url,
    description,
    role,
    element,
    rarity,
    attribute,
    region,
    weapon,
  } = VALIDATE_FIELDS.data

  try {
    const CHARACTER = await db.characters.create({
      data: {
        name,
        description,
        role: role as RoleEnum,
        element: element as ElementEnum,
        rarity: rarity as RarityEnum,
        attribute: attribute as AttributeEnum,
        region: region as RegionEnum,
        weapon: weapon as WeaponTypeEnum,
      },
    })

    await db.characterImage.create({
      data: {
        character_id: CHARACTER.id,
        splash_art_url: image_url,
      },
    })

    return { status: 201, message: 'Personaje creado.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
