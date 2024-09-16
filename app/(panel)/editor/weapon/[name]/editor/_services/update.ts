'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { WeaponSchema } from '@/schemas'
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

    return { status: 201, message: 'Arma actualizada.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
