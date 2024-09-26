'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { WeaponSchema } from '@/schemas'
import db from '@/lib/db'

export async function updateWeapon(
  data: z.infer<typeof WeaponSchema>,
  weapon_id: string | undefined 
) {
  const ROLE = await currentRole()

  if (ROLE !== 'ADMIN') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = WeaponSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 400, message: 'Campos inválidos.' }
  }

  const {
    name,
    image_url,
    main_stat,
    base_attack,
    passive_description,
    type,
    rarity,
  } = data

  try {
    await db.weapons.update({
      where: {
        id: weapon_id,
      },
      data: {
        name,
        image_url,
        main_stat,
        base_attack: Number(base_attack),
        passive_description,
        type,
        rarity,
      },
    })

    return { status: 201, message: 'Cambios guardados.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrió un error.' }
  }
}
