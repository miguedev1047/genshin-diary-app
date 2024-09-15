'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { WeaponSchema } from '@/schemas'
import { AttributeEnum, RarityEnum, WeaponTypeEnum } from '@prisma/client'
import db from '@/lib/db'

export async function createWeapon(data: z.infer<typeof WeaponSchema>) {
  const ROLE = await currentRole()

  if (ROLE !== 'ADMIN') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = WeaponSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 400, message: 'Campos invalidos.' }
  }

  const {
    name,
    image_url,
    passive_description,
    rarity,
    type,
    base_attack,
    main_stat,
  } = VALIDATE_FIELDS.data

  try {
    await db.weapons.create({
      data: {
        main_stat: main_stat as AttributeEnum,
        name,
        image_url,
        passive_description,
        rarity: rarity as RarityEnum,
        type: type as WeaponTypeEnum,
        base_attack: Number(base_attack),
      },
    })

    return { status: 201, message: 'Arma creada.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
