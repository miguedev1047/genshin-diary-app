import { db } from '@/lib/db'

export const getTierList = async () => {
  try {
    const TIERLISTS = await db.tierList.findMany({
      include: { tiers: { include: { characters: true } } },
    })

    return TIERLISTS
  } catch (error) {
    return null
  }
}
