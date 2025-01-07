'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { MaterialQuantitySchema } from '@/schemas'
import { db } from '@/lib/db'

export async function updateWeaponAscensionMaterialQuantity(
  data: z.infer<typeof MaterialQuantitySchema>,
  material_id: string | undefined
) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    await db.weaponAscensionMaterials.update({
      where: { id: material_id },
      data: {
        quantity: Number(data.quantity),
      },
    })

    return { status: 201, message: 'Cambios guardados.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
