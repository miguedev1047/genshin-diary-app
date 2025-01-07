'use client'

import { SquareBox } from '@/components/square-box'
import { DEFAULT_IMAGE, PARSE_OPTIONS } from '@/consts/misc'
import { Materials } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import parse from 'html-react-parser'

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
    accessorKey: 'description',
    header: 'Descripción',
    cell: ({ row }) => {
      const { description } = row.original

      return (
        <div className='text-pretty opacity-70'>
          {parse(description, PARSE_OPTIONS)}
        </div>
      )
    },
  },
]
