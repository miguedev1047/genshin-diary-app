'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TeamItemProps } from '@/editor/character/[name]/teams/_components/team-item/team-item.type'
import { SortableList } from '@/shared/components/sortable-list'
import { updateTeamCharacters } from '@/editor/character/[name]/teams/_services/update'
import { deleteTeamCharacter } from '@/editor/character/[name]/teams/_services/delete'
import { CharacterItem } from '@/editor/character/[name]/teams/_components/character-item'
import { DeleteButton } from '@/shared/layouts/panel/delete-button'
import { TeamNameForm } from '@/editor/character/[name]/teams/_components/team-name-form'
import { useDrag } from '@/features/hooks/use-drag'
import { Trash2 } from 'lucide-react'

export function TeamItem(props: TeamItemProps) {
  const { characters, id } = props

  const { orderedItems, handleDragEnd } = useDrag({
    items: characters,
    updateFn: updateTeamCharacters,
  })

  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between items-center gap-4'>
          <div className='flex items-center gap-3'>
            <DeleteButton
              itemId={id}
              onDelete={deleteTeamCharacter}
            >
              <Trash2 />
            </DeleteButton>
            <CardTitle>
              <TeamNameForm {...props} />
            </CardTitle>
          </div>
          <SortableList.DragHandle />
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
