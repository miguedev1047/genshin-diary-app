'use server'

import { z } from 'zod'
import { ASCENSION_WEAPON } from '@/consts/general'
import { currentRole } from '@/data/auth'
import { WeaponAscensionSchema } from '@/schemas'
import db from '@/lib/db'

export async function createCharacter(data: Array<any>) {
  const ROLE = await currentRole()

  if (ROLE !== 'ADMIN') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    await db.weaponBestCharacters.createMany({
      data,
      skipDuplicates: true,
    })

    return { status: 201, message: 'Personaje añadido.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}

export async function createAscension(
  data: z.infer<typeof WeaponAscensionSchema>,
  weapon_id: string | undefined
) {
  const ROLE = await currentRole()

  if (ROLE !== 'ADMIN') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  if (!weapon_id) {
    return { status: 403, message: 'Esta arma no existe.' }
  }

  const WEAPON_DATA = ASCENSION_WEAPON.find(
    (ascension) => ascension.ascension_level === data.ascension_level
  )!

  try {
    const ASCENSION = await db.weaponAscensions.create({
      data: {
        ascension_level: WEAPON_DATA?.ascension_level,
        cost: WEAPON_DATA.cost,
        level: WEAPON_DATA.level,
        order: WEAPON_DATA.order,
        weapon_id,
      },
    })

    const MATERIALS = data.materials.map((material) => ({
      material_id: material,
      ascension_id: ASCENSION.id,
    }))

    await db.weaponAscensionMaterials.createMany({
      data: MATERIALS,
      skipDuplicates: true,
    })

    return { status: 201, message: 'Ascensión agregada.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
