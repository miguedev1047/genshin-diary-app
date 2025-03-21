'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'
import { WeaponAscensionSchema } from '@/schemas'
import { getAscensionByRarity } from '@/features/utils/character-texts'

export async function createWeaponAscension(
  data: z.infer<typeof WeaponAscensionSchema>,
  weapon_id: string | undefined
) {
  if (!weapon_id) return { status: 400, message: 'Esta arma no existe.' }

  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = WeaponAscensionSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 400, message: 'Campos inválidos.' }
  }

  const WEAPON = await db.weapons.findUnique({ where: { id: weapon_id } })

  if (!WEAPON) {
    return { status: 403, message: 'El arma no existe.' }
  }

  const { ascension_level, materials } = VALIDATE_FIELDS.data

  const ASCENSION = getAscensionByRarity(WEAPON?.rarity)?.find(
    (i) => i.ascension_level === ascension_level
  )

  if (!ASCENSION) {
    return { status: 400, message: 'Esta ascensión no existe.' }
  }

  const MATERIALS = materials.map((material, index) => ({
    material_id: material,
    quantity: ASCENSION.materialQuantities[index] ?? 0,
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
