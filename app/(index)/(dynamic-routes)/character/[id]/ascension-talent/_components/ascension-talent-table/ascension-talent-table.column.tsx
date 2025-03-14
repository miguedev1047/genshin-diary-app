'use client'

import { MoraImg } from '@/assets/game'
import { SquareBox } from '@/components/square-box'
import { ColumnDef } from '@tanstack/react-table'
import { MaterialItem } from '@/app/(index)/(dynamic-routes)/character/[id]/ascension-talent/_components/material-item'
import { AscensionTalentProps } from '@/app/(index)/(dynamic-routes)/character/[id]/ascension-talent/_components/ascension-talent-table/ascension-talent.type'
import Image from 'next/image'

export const ascensionTalentsColumns: ColumnDef<AscensionTalentProps>[] = [
  {
    accessorKey: 'ascension',
    header: 'Ascensiones',
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
            <div className='absolute inset-x-0 bottom-0 g-black/70b supports-backdrop-filter:bg-background/60 py-1 flex items-center justify-center z-20'>
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
]
