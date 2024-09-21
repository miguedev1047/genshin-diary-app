'use client'

import { AscensionCharacter } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

export type Ascension = AscensionCharacter

export const columns: ColumnDef<Ascension>[] = [
  {
    accessorKey: 'ascension',
    header: 'Ascension',
  },
  {
    accessorKey: 'cost',
    header: 'Costo',
  },
  {
    accessorKey: 'materials',
    header: 'Materiales',
  },
  {
    accessorKey: 'actions',
    header: 'Acciones',
  },
]
