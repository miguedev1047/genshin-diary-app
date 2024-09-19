'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { WeaponMaterialQuantitySchema, WeaponSchema } from '@/schemas'
import db from '@/lib/db'

export async function updateWeapon(
  data: z.infer<typeof WeaponSchema>,
  wepon_id: string | undefined
) {
  if (!wepon_id) {
    return { status: 400, message: 'Arma no encontrada.' }
  }

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
    await db.weapons.update({
      where: {
        id: wepon_id,
      },
      data: {
        name,
        image_url,
        passive_description,
        rarity,
        type,
        base_attack: Number(base_attack),
        main_stat,
      },
    })

    return { status: 201, message: 'Cambios guardados.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}

export async function updateMaterialQuantity(
  data: z.infer<typeof WeaponMaterialQuantitySchema>,
  material_id: string | undefined
) {
  const ROLE = await currentRole()

  if (ROLE !== 'ADMIN') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = WeaponMaterialQuantitySchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 400, message: 'Campos invalidos.' }
  }

  const { quantity } = VALIDATE_FIELDS.data

  try {
    await db.weaponAscensionMaterials.update({
      where: { id: material_id },
      data: {
        quantity: Number(quantity),
      },
    })

    return { status: 201, message: 'Cambios guardados.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
