'use server'

import { currentRole } from '@/data/auth'
import { db } from '@/lib/db'
import { AccountSchema } from '@/schemas'
import { z } from 'zod'

export async function updateAccount(
  data: z.infer<typeof AccountSchema>,
  account_id: string
) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return { status: 403, message: 'No tiener permisos!' }
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
