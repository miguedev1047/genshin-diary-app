'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { MaterialQuantitySchema } from '@/schemas'
import { db } from '@/lib/db'

export async function updateTalentAscensionMaterialQuantity(
  data: z.infer<typeof MaterialQuantitySchema>,
  material_id: string | undefined
) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = MaterialQuantitySchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 400, message: 'Campos invalidos.' }
  }

  const { quantity } = VALIDATE_FIELDS.data

  try {
    await db.talentsAscensionCharacterMaterial.update({
      where: { id: material_id },
      data: {
        quantity: Number(quantity),
      },
    })

    return { status: 201, message: 'Cambios guardados.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
