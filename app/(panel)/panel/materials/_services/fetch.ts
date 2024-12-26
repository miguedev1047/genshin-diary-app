import { currentRole } from '@/data/auth'
import { Materials } from '@prisma/client'
import { db } from '@/lib/db'

type Props = { name: string; type: string }
type MaterialProps = {
  [key: string]: { category: string; materials: Array<Materials> }
}

export async function getMaterials(props: Props) {
  const { name, type } = props

  const ROLE = await currentRole()
  if (ROLE === 'USER') return null

  try {
    if (name || type) {
      const MATERIALS = await db.materials.findMany({
        orderBy: [{ rarity: 'asc' }, { name: 'asc' }, { date_created: 'desc' }],
      })

      const FILTERED_MATERIALS = MATERIALS.filter(
        (m) =>
          m.name.toLowerCase().includes(name.toLowerCase()) ||
          m.type.toLowerCase().includes(type.toLowerCase())
      )

      const GROUPED_MATERIALS = Object.values(
        FILTERED_MATERIALS.reduce((acc, material) => {
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

      return GROUPED_MATERIALS
    }

    const MATERIALS = await db.materials.findMany({
      orderBy: [{ rarity: 'asc' }, { name: 'asc' }, { date_created: 'desc' }],
    })

    const GROUPED_MATERIALS = Object.values(
      MATERIALS.reduce((acc, material) => {
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

    return GROUPED_MATERIALS
  } catch (error) {
    return null
  }
}
