'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'
import { AccountSchema } from '@/schemas'

export async function updateAccount(
  data: z.infer<typeof AccountSchema>,
  account_id: string
) {
  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = AccountSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 403, message: 'Campos invalidos!' }
  }

  const { email, name, role } = VALIDATE_FIELDS.data

  try {
    await db.user.update({
      where: {
        id: account_id,
      },
      data: {
        email,
        name,
        role,
      },
    })

    return { status: 201, message: 'Cambios guardados!' }
  } catch {
    return { status: 500, message: 'Ha ocurrido un errro!' }
  }
}
