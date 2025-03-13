'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { MaterialQuantitySchema, TalentSchema } from '@/schemas'
import { db } from '@/lib/db'
import { ASCENSION_TALENT } from '@/consts/general'

export async function updateMaterialTalentAscension(
  data: z.infer<typeof TalentSchema>,
  character_id: string | undefined,
  ascension_id: string
) {
  if (!character_id) return { status: 403, message: 'El personaje no existe.' }

  const ROLE = await currentRole()
  if (ROLE === 'USER') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = TalentSchema.safeParse(data)
  if (!VALIDATE_FIELDS.success) {
    return { status: 403, message: 'Campos invalidos.' }
  }

  const { talent_level, materials } = VALIDATE_FIELDS.data

  const SELECTED_LEVEL = ASCENSION_TALENT.find(
    (item) => item.ascension === talent_level
  )!

  const MATERIALS = materials.map((material, index) => ({
    character_id,
    ascension_id,
    material_id: material,
    quantity: SELECTED_LEVEL.materialQuatities[index] ?? 0,
  }))

  try {
    await db.talentsAscensionCharacterMaterial.deleteMany({
      where: { ascension_id },
    })

    await db.talentsAscensionCharacterMaterial.createMany({
      data: MATERIALS,
    })

    return { status: 201, message: 'Cambios guardados.' }
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}

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
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
