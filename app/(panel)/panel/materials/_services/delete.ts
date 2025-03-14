'use server'

import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'

export async function deleteMaterial(material_id: string) {
  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    await db.weaponAscensionMaterials.deleteMany({
      where: { material_id },
    })
    
    await db.materials.delete({
      where: { id: material_id },
    })

    return { status: 201, message: 'Material eliminado.' }
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
