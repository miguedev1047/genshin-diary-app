import { currentRole } from '@/data/auth'
import { Materials } from '@prisma/client'
import db from '@/lib/db'

type Props = { name: string; type: string }
type MaterialProps = {
  [key: string]: { category: string; materials: Array<Materials> }
}

export async function getMaterials(props: Props) {
  const { name, type } = props

  const ROLE = await currentRole()

  if (ROLE !== 'ADMIN') {
    return null
  }

  try {
    const MATERIALS = await db.materials.findMany({
      where: {
        ...(name && { name: { contains: name, mode: 'insensitive' } }),
        ...(type && { type: type.toUpperCase() }),
      },
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