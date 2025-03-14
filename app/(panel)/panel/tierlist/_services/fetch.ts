import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'

export const getTierList = async () => {
  if (await isCurrentRole('USER')) {
    return null
  }

  try {
    const TIERLISTS = await db.tierList.findMany({
      include: {
        tiers: { include: { characters: { orderBy: { order: 'asc' } }  } },
      },
    })

    return TIERLISTS
  } catch {
    return null
  }
}
