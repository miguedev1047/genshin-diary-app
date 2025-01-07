import { Card, CardContent } from '@/components/ui/card'
import { CharacterItemProps } from '@/app/(panel)/editor/character/[id]/teams/_components/character-item/character-item.type'
import { useGetCharacter } from '@/features/queries/panel/use-characters'
import { SortableList } from '@/app/(panel)/_components/sortable-list'
import { ConstellationForm } from '@/app/(panel)/editor/character/[id]/teams/_components/constellation-form'
import { Badge } from '@/components/ui/badge'

export function CharacterItem(props: CharacterItemProps) {
  const { character_id, id, constellation } = props
  const { data: CHARACTER } = useGetCharacter(character_id)

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
