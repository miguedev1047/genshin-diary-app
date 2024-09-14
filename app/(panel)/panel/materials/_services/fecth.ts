import { currentRole } from '@/data/auth'
import db from '@/lib/db'

type Props = {
  name: string
}

export async function getMaterials(props: Props) {
  const { name } = props

  const ROLE = await currentRole()

  if (ROLE !== 'ADMIN') {
    return null
  }

  try {
    const MATERIALS = await db.materials.findMany({
      where: {
        ...(name && { name: { contains: name, mode: 'insensitive' } }),
      },
      orderBy: [{ rarity: 'asc' }, { name: 'asc' }, { date_created: 'desc' }],
    })

    return MATERIALS
  } catch (error) {
    return null
  }
}
