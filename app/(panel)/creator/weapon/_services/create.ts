'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { WeaponSchema } from '@/schemas'
import { db } from '@/lib/db'
import { getWeapon } from './fetch'
import { revalidatePath } from 'next/cache'

export async function createWeapon(data: z.infer<typeof WeaponSchema>) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
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
    max_base_attack,
    max_secondary_stat_base,
    min_base_attack,
    min_secondary_stat_base,
    secondary_stat,
  } = VALIDATE_FIELDS.data

  const WEAPON = await getWeapon(name)

  if (WEAPON) {
    return { status: 500, message: 'Esta arma ya existe!' }
  }

  try {
    await db.weapons.create({
      data: {
        secondary_stat,
        name,
        image_url,
        passive_description,
        rarity,
        type,
        max_base_attack: parseInt(max_base_attack),
        min_base_attack: parseInt(min_base_attack),
        max_secondary_stat_base: Number(max_secondary_stat_base),
        min_secondary_stat_base: Number(min_secondary_stat_base),
      },
    })

    revalidatePath('/weapons')
    return { status: 201, message: 'Arma creada.' }
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
