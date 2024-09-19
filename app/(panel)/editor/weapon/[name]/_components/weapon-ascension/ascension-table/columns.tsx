'use client'

import { MoraImg } from '@/assets/game'
import { Prisma } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { MaterialItem } from '../material-item/material-item'
import { Actions } from '../actions'
import Image from 'next/image'

type Ascension = Prisma.WeaponAscensionsGetPayload<{
  include: { materials: true }
}>

export const columns: ColumnDef<Ascension>[] = [
  {
    accessorKey: 'ascension',
    header: 'Ascensión',
    cell: ({ row }) => {
      const { ascension_level } = row.original

      const [_, LEVEL_NUMBER] = ascension_level.split('_')

      return <p>Ascensión {LEVEL_NUMBER}</p>
    },
  },
  {
    accessorKey: 'level',
    header: 'Nivel',
    cell: ({ row }) => {
      const { level } = row.original
      return <div>{level}</div>
    },
  },
  {
    accessorKey: 'costs',
    header: 'Costos',
    cell: ({ row }) => {
      const { cost } = row.original

      const FORMATTED_COST = cost.toLocaleString('en-US', {
        style: 'decimal',
      })

      return (
        <div className='flex items-center gap-2'>
          <figure className='relative size-20 aspect-auto bg-secondary p-1 rounded-md !overflow-hidden'>
            <Image
              priority
              src={MoraImg.src}
              alt='Mora Img'
              width={720}
              height={720}
              className='object-contain size-full'
            />
            <div className='absolute inset-x-0 bottom-0 g-black/70b supports-[backdrop-filter]:bg-background/60 py-1 flex items-center justify-center z-20'>
              <p>{FORMATTED_COST}</p>
            </div>
          </figure>
          <p>Moras</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'materials',
    header: 'Materiales',
    cell: ({ row }) => {
      const { materials } = row.original

      return (
        <ul className='flex items-center gap-2'>
          {materials.map((material) => (
            <li key={material.id}>
              <MaterialItem {...material} />
            </li>
          ))}
        </ul>
      )
    },
  },
  {
    accessorKey: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const { id } = row.original
      return <Actions id={id} />
    },
  },
]
