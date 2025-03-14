'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'
import { MaterialQuantitySchema, WeaponAscensionSchema } from '@/schemas'

export async function updateWeaponAscensionMaterials(
  data: z.infer<typeof WeaponAscensionSchema>,
  weapon_id: string | undefined,
  ascension_id: string
) {
  if (!weapon_id) return { status: 403, message: 'El personaje no existe.' }

  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = WeaponAscensionSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 403, message: 'Campos invalidos.' }
  }

  const { materials } = VALIDATE_FIELDS.data

  const MATERIALS = materials.map((material) => ({
    ascension_id,
    material_id: material,
  }))

  try {
    await db.weaponAscensionMaterials.deleteMany({
      where: { ascension_id },
    })

    await db.weaponAscensionMaterials.createMany({
      data: MATERIALS,
    })

    return { status: 201, message: 'Cambios guardados.' }
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}

export async function updateWeaponAscensionMaterialQuantity(
  data: z.infer<typeof MaterialQuantitySchema>,
  material_id: string | undefined
) {
  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    await db.weaponAscensionMaterials.update({
      where: { id: material_id },
      data: {
        quantity: parseInt(data.quantity),
      },
    })

    return { status: 201, message: 'Cambios guardados.' }
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
