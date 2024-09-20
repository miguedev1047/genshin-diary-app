import { currentRole } from '@/data/auth'
import { Materials } from '@prisma/client'
import db from '@/lib/db'

type Props = { name: string }
type MaterialProps = {
  [key: string]: { category: string; materials: Array<Materials> }
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

/**
 * -------------------------------------------
 * INPUT
 * -------------------------------------------
 */
// {
//   "id": "cm0rr6c320001tdz0qfc4e94f",
//   "image_url": "https://cdn.wanderer.moe/genshin-impact/items/whopperflower-nectar.png",
//   "name": "Néctar de Megaflora",
//   "description": "Néctar extraído del pistilo de una Megaflora. Contiene pequeñas cantidades de algunos elementos.\nEl sabor del néctar recuerda un poco al de la flor dulce.",
//   "type": "MATERIAL_UPGRADE",
//   "rarity": "STAR_1",
//   "date_created": "2024-09-07T06:17:22.095Z",
//   "date_updated": "2024-09-08T18:35:24.178Z"
// },

/**
 * -------------------------------------------
 * OUTPUT
 * -------------------------------------------
 */
// {
//   "categorie": "MATERIAL_UPGRADE",
//   "materials": [
//     {
//       "id": "cm0rr6c32000tdz0qf4e94f",
//       "image_url": "https://cdn.wanderer.moe/genshin-impact/items/whopperflower-nectar.png",
//       "name": "Néctar de Megaflora",
//       "description": "Néctar extraído del pistilo de una Megaflora...",
//       "type": "MATERIAL_UPGRADE",
//       "rarity": "STAR_1",
//       "date_created": "2024-09-07T06:17:22.095Z",
//       "date_updated": "2024-09-08T18:35:24.187Z"
//     },
//   ]
// },
