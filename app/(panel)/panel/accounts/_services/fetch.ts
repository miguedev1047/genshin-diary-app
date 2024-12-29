import { currentRole, currentUser } from '@/data/auth'
import { db } from '@/lib/db'

export async function getAccounts() {
  const [ROLE, USER] = await Promise.all([currentRole(), currentUser()])
  if (ROLE === 'USER' || !USER) return null

  try {
    const ACCOUNTS = await db.user.findMany({
      select: {
        email: true,
        id: true,
        name: true,
        role: true,
      },
      where: { id: { not: USER.id } },
    })

    return ACCOUNTS
  } catch (error) {
    return null
  }
}
