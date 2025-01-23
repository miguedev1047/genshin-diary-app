'use server'

import { z } from 'zod'
import { ASCENSION_WEAPON } from '@/consts/general'
import { currentRole } from '@/data/auth'
import { WeaponAscensionSchema } from '@/schemas'
import { db } from '@/lib/db'

export async function createWeaponAscension(
  data: z.infer<typeof WeaponAscensionSchema>,
  weapon_id: string | undefined,
) {
  if (!weapon_id) return { status: 400, message: 'Esta arma no existe.' }

  const ROLE = await currentRole()
  if (ROLE === 'USER') {
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
  } catch (error) {
    console.log(error)
    return { status: 500, message: 'Ocurrió un error.' }
  }
}
