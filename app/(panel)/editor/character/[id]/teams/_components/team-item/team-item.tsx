'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TeamItemProps } from '@/app/(panel)/editor/character/[id]/teams/_components/team-item/team-item.type'
import { SortableList } from '@/app/(panel)/_components/sortable-list'
import { updateTeamCharactersOrder } from '@/app/(panel)/editor/character/[id]/teams/_services/update'
import { CharacterItem } from '@/app/(panel)/editor/character/[id]/teams/_components/character-item'
import { useDrag } from '@/features/hooks/use-drag'
import { TeamAction } from '@/app/(panel)/editor/character/[id]/teams/_components/team-action'

export function TeamItem(props: TeamItemProps) {
  const { name, characters, id } = props

  const { orderedItems, handleDragEnd } = useDrag({
    items: characters,
    updateFn: updateTeamCharactersOrder, 
  })

  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between items-center gap-4'>
          <div className='flex items-center gap-2'>
            <SortableList.DragHandle />
            <CardTitle className='text-lg'>{name}</CardTitle>
          </div>
          <TeamAction id={id} />
        </div>
      </CardHeader>
      <CardContent>
        <SortableList
          items={orderedItems}
          onDragEnd={handleDragEnd}
          renderItem={(item) => (
            <SortableList.Item id={item.id}>
              <CharacterItem {...item} />
            </SortableList.Item>
          )}
        />
      </CardContent>
    </Card>
  )
}
