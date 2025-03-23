'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { ASCENSION_TALENT } from '@/consts/general'
import { isCurrentRole } from '@/data/auth'
import { TalentSchema } from '@/schemas'

export async function createTalentAscension(
  data: z.infer<typeof TalentSchema>,
  character_id: string | undefined
) {
  if (!character_id) return { status: 403, message: 'El personaje no existe.' }

  if (await isCurrentRole('USER')) {
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
    material_id: material,
    quantity: SELECTED_LEVEL.materialQuatities[index] ?? 0,
  }))

  try {
    await db.talentsAscensionCharacter.create({
      data: {
        character_id,
        ascension_level: SELECTED_LEVEL?.ascension,
        order: SELECTED_LEVEL?.order,
        cost: SELECTED_LEVEL?.cost,
        level: SELECTED_LEVEL?.level,
        materials: {
          createMany: {
            data: MATERIALS,
          },
        },
      },
    })

    return { status: 201, message: 'Talento añadido.' }
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
