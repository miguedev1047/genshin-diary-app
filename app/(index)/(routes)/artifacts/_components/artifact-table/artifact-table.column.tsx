'use client'

import { SquareBox } from '@/components/square-box'
import { DEFAULT_IMAGE, PARSE_OPTIONS } from '@/consts/misc'
import { Artifacts } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import parse from 'html-react-parser'

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
            className='size-full object-cover'
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

      return (
        <div className='text-pretty opacity-70'>
          {parse(bonus_description, PARSE_OPTIONS)}
        </div>
      )
    },
  },
]
