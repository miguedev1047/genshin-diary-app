import { MoraImg } from '@/assets/game'
import { ColumnDef } from '@tanstack/react-table'
import { MaterialItem } from '@/app/(panel)/editor/character/[id]/ascensions/_components/material-item'
import { Ascension } from '@/app/(panel)/editor/character/[id]/ascensions'
import { SquareBox } from '@/components/square-box'
import { DeleteButton } from '@/app/(panel)/_components/delete-button'
import { deleteAscension } from '@/app/(panel)/editor/character/[id]/ascensions/_services/delete'
import { AscensionForm as AscensionEditor } from '@/app/(panel)/editor/character/[id]/ascensions/_components/ascension-form'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'

export const ascensionColumns: ColumnDef<Ascension>[] = [
  {
    accessorKey: 'ascension',
    header: 'Ascension',
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
        <div className='flex items-center gap-2'>
          <AscensionEditor id={id} />

          <DeleteButton
            itemId={id}
            onDelete={deleteAscension}
          >
            <Trash2 />
          </DeleteButton>
        </div>
      )
    },
  },
]
