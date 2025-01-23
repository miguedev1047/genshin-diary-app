import { Card, CardContent } from '@/components/ui/card'
import { WeaponItemProps } from './weapon-item.type'
import { useGetWeapon } from '@/features/queries/use-weapons'
import { DEFAULT_IMAGE } from '@/consts/misc'
import { SortableList } from '@/app/(panel)/_components/sortable-list'
import { DeleteButton } from '@/app/(panel)/_components/delete-button'
import { deleteWeapon } from '@/app/(panel)/editor/character/[id]/weapons/_services/delete'
import { Trash2 } from 'lucide-react'
import { SquareBox } from '@/components/square-box'
import { useGetData } from '@/features/providers/data-provider'
import Image from 'next/image'

export function WeaponItem(props: WeaponItemProps) {
  const { weapon_id, id } = props
  const { data } = useGetData()

  const { weapons } = data
  const WEAPON = weapons?.find((weapon) => weapon.id === weapon_id)

  if (!WEAPON) return null

  return (
    <Card className='select-none'>
      <CardContent className='p-5 flex items-center justify-between gap-4'>
        <div className='flex items-center gap-4'>
          <SquareBox>
            <Image
              src={WEAPON.image_url ?? DEFAULT_IMAGE}
              alt={WEAPON.name}
              width={1080}
              height={1080}
              className='object-contain size-full'
            />
          </SquareBox>
          <p className='text-sm text-center'>{WEAPON.name}</p>
        </div>

        <div className='flex items-center gap-2'>
          <DeleteButton
            itemId={id}
            onDelete={deleteWeapon}
          >
            <Trash2 />
          </DeleteButton>

          <SortableList.DragHandle />
        </div>
      </CardContent>
    </Card>
  )
}
