'use server'

import { currentRole } from '@/data/auth'
import { db } from '@/lib/db'
import { AccountSchema } from '@/schemas'
import { z } from 'zod'
import bcrypt from 'bcrypt-edge'


export async function createAccount(data: z.infer<typeof AccountSchema>) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return { status: 403, message: 'No tiener permisos!' }
  }

  const VALIDATE_FIELDS = AccountSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 403, message: 'Campos invalidos!' }
  }

  const { email, name, password, role } = VALIDATE_FIELDS.data
  const HASH_PASSWORD = bcrypt.hashSync(password!, 10)

  try {
    await db.user.create({
      data: {
        email,
        name,
        password: HASH_PASSWORD,
        role,
      },
    })

    return { status: 201, message: 'Cuenta creada!' }
  } catch (error) {
    return { status: 500, message: 'Ha ocurrido un errro!' }
  }
}
