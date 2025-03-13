'use server'

import { currentRole } from '@/data/auth'
import { db } from '@/lib/db'

export async function deleteAccount(id: string) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return { status: 403, message: 'No tienes permisos!' }
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
