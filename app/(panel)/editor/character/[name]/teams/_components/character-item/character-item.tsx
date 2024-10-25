import { Card, CardContent } from '@/components/ui/card'
import { CharacterItemProps } from '@/editor/character/[name]/teams/_components/character-item/character-item.type'
import { useGetCharacter } from '@/features/queries/panel/use-characters'
import { Skeleton } from '@/components/ui/skeleton'
import { SortableList } from '@/shared/components/sortable-list'
import { ConstellationForm } from '@/editor/character/[name]/teams/_components/constellation-form'
import { Badge } from '@/components/ui/badge'

export function CharacterItem(props: CharacterItemProps) {
  const { character_id, id, constellation } = props
  const { data: CHARACTER, status } = useGetCharacter(character_id)

  if (status !== 'success') return <ItemLoader />

  return (
    <Card className='select-none'>
      <CardContent className='p-5 flex items-center justify-between gap-4'>
        <div className='flex items-center gap-4'>
          <Badge>C{constellation}</Badge>

          <div className='flex items-center gap-4'>
            <ConstellationForm
              data={CHARACTER}
              itemId={id}
              constellation={constellation}
            />
            <p className='text-sm text-center'>{CHARACTER?.name}</p>
          </div>
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
