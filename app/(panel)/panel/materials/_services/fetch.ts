import { currentRole } from '@/data/auth'
import { Materials } from '@prisma/client'
import { db } from '@/lib/db'

type Props = { name: string; type: string }

type MaterialProps = {
  [key: string]: { category: string; materials: Array<Materials> }
}

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

function groupMaterials(materials: Array<Materials>) {
  return Object.values(
    materials.reduce((acc, material) => {
      if (!acc[material.type]) {
        acc[material.type] = {
          category: material.type,
          materials: [],
        }
      }
      acc[material.type].materials.push(material)
      return acc
    }, {} as MaterialProps)
  )
}

export async function getMaterials(props: Props) {
  const ROLE = await currentRole()
  if (ROLE === 'USER') return null

  try {
    const MATERIALS = await db.materials.findMany({
      orderBy: [{ date_created: 'desc' }, { rarity: 'desc' }, { name: 'asc' }],
    })

    const FILTERED_MATERIALS = filterMaterials(MATERIALS, { ...props })
    const GROUPED_MATERIALS = groupMaterials(FILTERED_MATERIALS)

    return GROUPED_MATERIALS
  } catch {
    return null
  }
}
