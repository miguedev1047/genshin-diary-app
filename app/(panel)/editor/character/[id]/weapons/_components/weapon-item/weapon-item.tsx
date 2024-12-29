import { Card, CardContent } from '@/components/ui/card'
import { WeaponItemProps } from './weapon-item.type'
import { useGetWeapon } from '@/features/queries/panel/use-weapons'
import { DEFAULT_IMAGE } from '@/consts/general'
import { SortableList } from '@/app/(panel)/_components/sortable-list'
import { DeleteButton } from '@/app/(panel)/_components/delete-button'
import { deleteWeapon } from '@/app/(panel)/editor/character/[id]/weapons/_services/delete'
import { Trash2 } from 'lucide-react'
import { SquareBox } from '@/components/square-box'
import Image from 'next/image'

export function WeaponItem(props: WeaponItemProps) {
  const { weapon_id, id } = props
  const { data: WEAPON } = useGetWeapon(weapon_id)

  return (
    <Card className='select-none'>
      <CardContent className='p-5 flex items-center justify-between gap-4'>
        <div className='flex items-center gap-4'>
          <SquareBox size='sm'>
            <Image
              src={WEAPON?.image_url ?? DEFAULT_IMAGE}
              alt={WEAPON?.name ?? 'Weapon Image'}
              width={1080}
              height={1080}
              className='object-cover size-full'
            />
          </SquareBox>
          <p className='text-sm text-center'>{WEAPON?.name}</p>
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
