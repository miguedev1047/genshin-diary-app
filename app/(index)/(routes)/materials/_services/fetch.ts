import { Materials } from '@prisma/client'
import { db } from '@/lib/db'

type Props = { name: string; type: string }

function filterMaterials(materials: Array<Materials>, filters: Props) {
  const { name, type } = filters

  return materials.filter((m) => {
    const matches = [
      name ? m.name.toLowerCase().includes(name.toLowerCase()) : true,
      type ? m.type.toLowerCase().includes(type.toLowerCase()) : true,
    ]

    return matches.every(Boolean)
  })
}

export async function getMaterials(props: Props) {
  try {
    const MATERIALS = await db.materials.findMany({
      orderBy: [{ rarity: 'desc' }, { name: 'asc' }, { date_created: 'desc' }],
    })

    const FILTERED_MATERIALS = filterMaterials(MATERIALS, { ...props })

    return FILTERED_MATERIALS
  } catch (error) {
    return null
  }
}
