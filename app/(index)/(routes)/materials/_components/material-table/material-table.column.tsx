'use client'

import { SquareBox } from '@/components/square-box'
import { DEFAULT_IMAGE } from '@/consts/misc'
import { Materials } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { MaterialDescription } from '@/app/(index)/(routes)/materials/_components/material-description'
import Image from 'next/image'

export const materialColumns: ColumnDef<Materials>[] = [
  {
    accessorKey: 'artifact',
    header: 'Artefacto',
    cell: ({ row }) => {
      const { image_url, name } = row.original

      return (
        <SquareBox size='lg'>
          <Image
            src={image_url ?? DEFAULT_IMAGE}
            width={128}
            height={128}
            alt={name}
            className='size-full object-contain'
          />
        </SquareBox>
      )
    },
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => {
      const { name } = row.original

      return <p className='text-balance'>{name}</p>
    },
  },
  {
    accessorKey: 'description',
    header: 'Descripción',
    cell: ({ row }) => {
      const { description } = row.original

      return <MaterialDescription description={description} />
    },
  },
]
