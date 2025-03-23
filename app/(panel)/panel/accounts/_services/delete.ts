'use server'

import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'

export async function deleteAccount(id: string) {
  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    await db.user.delete({
      where: { id },
    })

    return { status: 201, message: 'Cuenta eliminida!' }
  } catch {
    return { status: 403, message: 'Ha ocurrido un error!' }
  }
}
