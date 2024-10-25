'use server'

import { z } from 'zod'
import { ASCENSION_WEAPON } from '@/consts/general'
import { currentRole } from '@/data/auth'
import { WeaponAscensionSchema } from '@/schemas'
import db from '@/lib/db'

export async function createWeaponAscension(
  data: z.infer<typeof WeaponAscensionSchema>,
  weapon_id: string | undefined
) {
  if (!weapon_id) return { status: 400, message: 'Esta arma no existe.' }

  const ROLE = await currentRole()
  if (ROLE !== 'ADMIN') {
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

  try {
    const CREATE_ASCENSION = await db.weaponAscensions.create({
      data: {
        weapon_id,
        ascension_level: ASCENSION.ascension_level,
        cost: ASCENSION.cost,
        level: ASCENSION.level,
        order: ASCENSION.order,
      },
    })

    const MATERIALS = materials.map((material) => ({
      ascension_id: CREATE_ASCENSION.id,
      material_id: material,
    }))

    await db.weaponAscensionMaterials.createMany({
      data: MATERIALS,
      skipDuplicates: true,
    })

    return { status: 201, message: 'Ascensión creada.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrió un error.' }
  }
}
