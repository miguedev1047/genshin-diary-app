'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { ASCENSION_WEAPON } from '@/consts/general'
import { isCurrentRole } from '@/data/auth'
import { WeaponAscensionSchema } from '@/schemas'

export async function createWeaponAscension(
  data: z.infer<typeof WeaponAscensionSchema>,
  weapon_id: string | undefined,
) {
  if (!weapon_id) return { status: 400, message: 'Esta arma no existe.' }

  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = WeaponAscensionSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 400, message: 'Campos inválidos.' }
  }

  const { ascension_level, materials } = VALIDATE_FIELDS.data

  const ASCENSION = ASCENSION_WEAPON.find(
    (i) => i.ascension_level === ascension_level
  )

  if (!ASCENSION) {
    return { status: 400, message: 'Esta ascensión no existe.' }
  }

  const MATERIALS = materials.map((material) => ({
    material_id: material,
  }))

  try {
    await db.weaponAscensions.create({
      data: {
        weapon_id,
        ascension_level: ASCENSION.ascension_level,
        cost: ASCENSION.cost,
        level: ASCENSION.level,
        order: ASCENSION.order,
        materials: {
          createMany: { data: MATERIALS },
        },
      },
    })

    return { status: 201, message: 'Ascensión creada.' }
  } catch {
    return { status: 500, message: 'Ocurrió un error.' }
  }
}
