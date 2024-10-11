import { Card, CardContent } from '@/components/ui/card'
import { CharacterItemProps } from '@/editor/character/[name]/teams/_components/character-item/character-item.type'
import { useGetCharacter } from '@/features/queries/panel/use-characters'
import { Skeleton } from '@/components/ui/skeleton'
import { SortableList } from '@/shared/components/sortable-list'
import { DEFAULT_IMAGE } from '@/consts/general'
import Image from 'next/image'

export function CharacterItem(props: CharacterItemProps) {
  const { character_id, id } = props
  const { data: CHARACTER, status } = useGetCharacter(character_id)

  if (status !== 'success') return <ItemLoader />

  return (
    <Card className='select-none'>
      <CardContent className='p-5 flex items-center justify-between gap-4'>
        <div className='flex items-center gap-4'>
          <figure className='aspect-square bg-secondary rounded-lg size-16'>
            <Image
              src={CHARACTER?.images?.splash_art_url ?? DEFAULT_IMAGE}
              alt={CHARACTER?.name ?? 'Character Image'}
              width={1080}
              height={1080}
              className='object-cover size-full'
            />
          </figure>
          <p className='text-sm text-center'>{CHARACTER?.name}</p>
        </div>

        <SortableList.DragHandle />
      </CardContent>
    </Card>
  )
}

function ItemLoader() {
  return (
    <Card className='p-0'>
      <CardContent className='p-5 flex items-center gap-4'>
        <Skeleton className='aspect-square bg-secondary rounded-lg size-16' />
        <Skeleton className='h-5 w-full max-w-[200px]' />
      </CardContent>
    </Card>
  )
}
