'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { AscensionSchema, MaterialQuantitySchema } from '@/schemas'
import { db } from '@/lib/db'

export async function updateMaterials(
  data: z.infer<typeof AscensionSchema>,
  character_id: string | undefined,
  ascension_id: string
) {
  if (!character_id) return { status: 403, message: 'El personaje no existe.' }

  const ROLE = await currentRole()
  if (ROLE === 'USER') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = AscensionSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 403, message: 'Campos invalidos.' }
  }

  const { materials } = VALIDATE_FIELDS.data

  const MATERIALS = materials.map((material) => ({
    character_id,
    ascension_id,
    material_id: material,
  }))

  try {
    await db.materialAscension.deleteMany({
      where: { ascension_id },
    })

    await db.materialAscension.createMany({
      data: MATERIALS,
    })

    return { status: 201, message: 'Cambios guardados.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}

export async function updateMaterialQuantity(
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
    await db.materialAscension.update({
      where: { id: material_id },
      data: {
        quantity: parseInt(quantity),
      },
    })

    return { status: 201, message: 'Cambios guardados.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
