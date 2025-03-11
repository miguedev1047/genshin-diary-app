import { currentRole } from '@/data/auth'
import { db } from '@/lib/db'

export const getTierList = async () => {
  const ROLE = await currentRole()
  if (ROLE === 'USER') return null

  try {
    const TIERLISTS = await db.tierList.findMany({
      include: {
        tiers: { include: { characters: { orderBy: { order: 'asc' } }  } },
      },
    })

    return TIERLISTS
  } catch (error) {
    return null
  }
}
