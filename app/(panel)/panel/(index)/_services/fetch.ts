import { db } from '@/lib/db'

export async function fetchResumenChart() {
  try {
    const [CHARACTERS, WEAPONS, ARTIFACTS, MATERIALS] = await Promise.all([
      db.characters.findMany(),
      db.weapons.findMany(),
      db.artifacts.findMany(),
      db.materials.findMany(),
    ])

    const CHART_DATA = [
      {
        label: 'characters',
        total: CHARACTERS?.length ?? 0,
        fill: 'var(--color-characters)',
      },
      {
        label: 'weapons',
        total: WEAPONS?.length ?? 0,
        fill: 'var(--color-weapons)',
      },
      {
        label: 'artifacts',
        total: ARTIFACTS?.length ?? 0,
        fill: 'var(--color-artifacts)',
      },
      {
        label: 'materials',
        total: MATERIALS?.length ?? 0,
        fill: 'var(--color-materials)',
      },
    ]

    return CHART_DATA
  } catch {
    return null
  }
}

export async function fetchElementChart() {
  try {
    const CHARACTERS = await db.characters.findMany()

    const ELEMENTS = CHARACTERS.reduce((acc, character) => {
      const element = character.element.toLowerCase()

      if (acc[element]) {
        acc[element] += 1
      } else {
        acc[element] = 1
      }

      return acc
    }, {} as { [key: string]: number })

    const CHART_DATA = [
      {
        element: 'anemo',
        total: ELEMENTS?.anemo ?? 0,
        fill: 'var(--color-anemo)',
      },
      {
        element: 'geo',
        total: ELEMENTS?.geo ?? 0,
        fill: 'var(--color-geo)',
      },
      {
        element: 'electro',
        total: ELEMENTS?.electro ?? 0,
        fill: 'var(--color-electro)',
      },
      {
        element: 'dendro',
        total: ELEMENTS?.dendro ?? 0,
        fill: 'var(--color-dendro)',
      },
      {
        element: 'pyro',
        total: ELEMENTS?.pyro ?? 0,
        fill: 'var(--color-pyro)',
      },
      {
        element: 'cryo',
        total: ELEMENTS?.cryo ?? 0,
        fill: 'var(--color-cryo)',
      },
      {
        element: 'hydro',
        total: ELEMENTS?.hydro ?? 0,
        fill: 'var(--color-hydro)',
      },
    ]

    return CHART_DATA
  } catch {
    return null
  }
}
