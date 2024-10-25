'use server'

import { z } from 'zod'
import { ASCENSION_TALENT } from '@/consts/general'
import { currentRole } from '@/data/auth'
import { TalentSchema } from '@/schemas'
import db from '@/lib/db'

export async function createTalentAscension(
  data: z.infer<typeof TalentSchema>,
  character_id: string | undefined
) {
  if (!character_id) return { status: 403, message: 'El personaje no existe.' }

  const ROLE = await currentRole()
  if (ROLE !== 'ADMIN') {
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

  try {
    const LEVEL = await db.talentsAscensionCharacter.create({
      data: {
        character_id,
        ascension_level: SELECTED_LEVEL?.ascension,
        order: SELECTED_LEVEL?.order,
        cost: SELECTED_LEVEL?.cost,
        level: SELECTED_LEVEL?.level,
      },
    })

    const MATERIALS = materials.map((material) => ({
      material_id: material,
      ascension_id: LEVEL.id,
    }))

    await db.talentsAscensionCharacterMaterial.createMany({
      data: MATERIALS,
      skipDuplicates: true,
    })

    return { status: 201, message: 'Talento añadido.' }
  } catch (error) {
    console.log(error)
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
