'use server'

import { currentRole } from '@/data/auth'
import { db } from '@/lib/db'

export async function deleteMaterial(material_id: string) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    await db.materialCharacter.deleteMany({
      where: { material_id },
    })
    await db.weaponAscensionMaterials.deleteMany({
      where: { material_id },
    })
    await db.materials.delete({
      where: { id: material_id },
    })

    return { status: 201, message: 'Material eliminado.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
