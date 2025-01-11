import type { NextAuthConfig } from 'next-auth'
import { LoginSchema } from '@/schemas'
import { getUserByEmail } from '@/data/users'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt-edge'

export default {
  providers: [
    Credentials({
      async authorize(credentials): Promise<{ id: string } | null> {
        const validateFields = LoginSchema.safeParse(credentials)

        if (validateFields.success) {
          const { email, password } = validateFields.data

          const user = await getUserByEmail(email)
          if (!user || !user.password) return null

          const passwordMatch = bcrypt.compareSync(password, user.password)

          if (passwordMatch) return user
        }

        return null
      }
    })
  ]
} satisfies NextAuthConfig
