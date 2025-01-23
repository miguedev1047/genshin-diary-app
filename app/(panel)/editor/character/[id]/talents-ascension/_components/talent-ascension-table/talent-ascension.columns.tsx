'use client'

import { MoraImg } from '@/assets/game'
import { ColumnDef } from '@tanstack/react-table'
import { DeleteButton } from '@/app/(panel)/_components/delete-button'
import { Trash2 } from 'lucide-react'
import { TalentAscensionProps } from '@/app/(panel)/editor/character/[id]/talents-ascension/talent-ascension.type'
import { TalentAscensionForm as TalentAscensionEditor } from '@/app/(panel)/editor/character/[id]/talents-ascension/_components/talent-ascension-form'
import { MaterialItem } from '@/app/(panel)/editor/character/[id]/talents-ascension/_components/material-item'
import { deleteTalentAscension } from '@/app/(panel)/editor/character/[id]/talents-ascension/_services/delete'
import { SquareBox } from '@/components/square-box'
import Image from 'next/image'

export const talentAscensionColumns: ColumnDef<TalentAscensionProps>[] = [
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
      return <p>{level}</p>
    },
  },
  {
    accessorKey: 'cost',
    header: 'Costo',
    cell: ({ row }) => {
      const { cost } = row.original

      const FORMATTED_COST = cost.toLocaleString('en-US', {
        style: 'decimal',
      })

      return (
        <article className='flex items-center gap-2'>
          <SquareBox>
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
          </SquareBox>
          <p>Moras</p>
        </article>
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

      return (
        <div className='flex items-center gap-3'>
          <TalentAscensionEditor id={id} />

          <DeleteButton
            itemId={id}
            onDelete={deleteTalentAscension}
          >
            <Trash2 />
          </DeleteButton>
        </div>
      )
    },
  },
]
