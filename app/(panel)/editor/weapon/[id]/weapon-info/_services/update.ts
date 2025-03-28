'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'
import { WeaponSchema } from '@/schemas'

export async function updateWeapon(
  data: z.infer<typeof WeaponSchema>,
  weapon_id: string | undefined
) {
  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = WeaponSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 400, message: 'Campos inválidos.' }
  }

  const {
    name,
    image_url,
    max_base_attack,
    max_secondary_stat_base,
    min_base_attack,
    min_secondary_stat_base,
    secondary_stat,
    passive_description,
    type,
    rarity,
    is_new,
    is_public,
  } = data

  try {
    await db.weapons.update({
      where: {
        id: weapon_id,
      },
      data: {
        name,
        image_url,
        max_base_attack: parseInt(max_base_attack),
        min_base_attack: parseInt(min_base_attack),
        max_secondary_stat_base: Number(max_secondary_stat_base),
        min_secondary_stat_base: Number(min_secondary_stat_base),
        passive_description,
        secondary_stat,
        type,
        rarity,
        is_new,
        is_public,
      },
    })

    return { status: 201, message: 'Cambios guardados.' }
  } catch {
    return { status: 500, message: 'Ocurrió un error.' }
  }
}
