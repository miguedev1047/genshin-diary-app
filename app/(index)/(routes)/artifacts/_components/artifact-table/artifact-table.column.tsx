'use client'

import { SquareBox } from '@/components/square-box'
import { DEFAULT_IMAGE } from '@/consts/misc'
import { Artifacts } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { TiptapPreview } from '@/components/tiptap'
import Image from 'next/image'

export const artifactColumns: ColumnDef<Artifacts>[] = [
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
    accessorKey: 'bonus_description',
    header: 'Descripción',
    cell: ({ row }) => {
      const { bonus_description } = row.original

      return <TiptapPreview content={bonus_description} />
    },
  },
]
